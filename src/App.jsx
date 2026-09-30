import { useMemo, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  ArrowDownUp,
  Bell,
  CalendarDays,
  Cat,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Dog,
  HeartPulse,
  LayoutDashboard,
  PawPrint,
  Plus,
  Search,
  Scissors,
  Stethoscope,
  Syringe,
  Users,
  X,
} from 'lucide-react'

const INITIAL_APPOINTMENTS = [
  { id: 1, time: '08:30', service: 'Banho e tosa', pet: 'Pipoca', species: 'Cão', guardian: 'Responsável de demonstração', staff: 'Tosador 1', status: 'Concluído', note: 'Registro de exemplo. Confirmar necessidades e observações com o responsável.' },
  { id: 2, time: '09:00', service: 'Consulta', pet: 'Nina', species: 'Gato', guardian: 'Responsável de demonstração', staff: 'Dr. Gabriel Santos', status: 'Em atendimento', note: 'Ficha ilustrativa sem histórico clínico real.' },
  { id: 3, time: '09:30', service: 'Banho e tosa', pet: 'Bento', species: 'Cão', guardian: 'Responsável de demonstração', staff: 'Tosador 2', status: 'Confirmado', note: 'Preferências de estética não informadas. Validar na recepção.' },
  { id: 4, time: '10:00', service: 'Vacinação', pet: 'Amora', species: 'Gato', guardian: 'Responsável de demonstração', staff: 'Dra. Camila Paes', status: 'Confirmado', note: 'Demonstração: verificar carteira e protocolo antes do atendimento.' },
  { id: 5, time: '10:30', service: 'Banho e tosa', pet: 'Tobias', species: 'Cão', guardian: 'Responsável de demonstração', staff: 'Tosador 3', status: 'Aguardando', note: 'Registro de exemplo. Chegada ainda não confirmada.' },
  { id: 6, time: '11:00', service: 'Consulta', pet: 'Lua', species: 'Cão', guardian: 'Responsável de demonstração', staff: 'Veterinário plantonista 1', status: 'Confirmado', note: 'Ficha ilustrativa sem histórico clínico real.' },
  { id: 7, time: '11:30', service: 'Banho e tosa', pet: 'Chico', species: 'Gato', guardian: 'Responsável de demonstração', staff: 'Tosador 1', status: 'Confirmado', note: 'Preferências de estética não informadas. Validar na recepção.' },
  { id: 8, time: '12:00', service: 'Cirurgia de pequeno porte', pet: 'Mel', species: 'Cão', guardian: 'Responsável de demonstração', staff: 'Dr. Gabriel Santos', status: 'Pré-agendado', note: 'Demonstração: confirmar preparo e orientações com a equipe veterinária.' },
]

const STAFF = [
  { name: 'Dr. Gabriel Santos', role: 'Médico veterinário', short: 'GS', color: 'green' },
  { name: 'Dra. Camila Paes', role: 'Médica veterinária', short: 'CP', color: 'coral' },
  { name: 'Veterinário plantonista 1', role: 'Médico veterinário', short: 'V1', color: 'blue' },
  { name: 'Veterinário plantonista 2', role: 'Médico veterinário', short: 'V2', color: 'yellow' },
  { name: 'Tosador 1', role: 'Banho e tosa', short: 'T1', color: 'coral' },
  { name: 'Tosador 2', role: 'Banho e tosa', short: 'T2', color: 'green' },
  { name: 'Tosador 3', role: 'Banho e tosa', short: 'T3', color: 'blue' },
  { name: 'Recepção 1', role: 'Recepção', short: 'R1', color: 'yellow' },
  { name: 'Recepção 2', role: 'Recepção', short: 'R2', color: 'coral' },
]

const FILTERS = ['Todos', 'Banho e tosa', 'Consulta', 'Vacinação']

function ServiceIcon({ service, size = 16 }) {
  if (service === 'Banho e tosa') return <Scissors size={size} aria-hidden="true" />
  if (service === 'Vacinação') return <Syringe size={size} aria-hidden="true" />
  if (service === 'Cirurgia de pequeno porte') return <Activity size={size} aria-hidden="true" />
  return <Stethoscope size={size} aria-hidden="true" />
}

function statusClass(status) {
  return status.toLowerCase().replaceAll(' ', '-')
}

function AppointmentTicket({ appointment, selected, onSelect }) {
  const isGrooming = appointment.service === 'Banho e tosa'

  return (
    <button
      className={`ticket ${selected ? 'ticket--selected' : ''} ${appointment.status === 'Concluído' ? 'ticket--done' : ''}`}
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span className="ticket-time">{appointment.time}</span>
      <span className={`ticket-icon ${isGrooming ? 'ticket-icon--grooming' : 'ticket-icon--medical'}`}>
        <ServiceIcon service={appointment.service} />
      </span>
      <span className="ticket-pet">
        <strong>{appointment.pet}</strong>
        <span>{appointment.species} <i aria-hidden="true">·</i> {appointment.guardian}</span>
      </span>
      <span className="ticket-service">{appointment.service}</span>
      <span className="ticket-staff">{appointment.staff}</span>
      <span className={`status status--${statusClass(appointment.status)}`}>{appointment.status}</span>
      <ChevronRight className="ticket-chevron" size={17} aria-hidden="true" />
    </button>
  )
}

function AppointmentForm({ onSave, onCancel, appointments }) {
  const [pet, setPet] = useState('')
  const [guardian, setGuardian] = useState('')
  const [service, setService] = useState('Banho e tosa')
  const [staff, setStaff] = useState('Tosador 1')
  const [time, setTime] = useState('12:30')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const collision = appointments.find((appointment) => appointment.staff === staff && appointment.time === time)

    if (collision) {
      setError(`${staff} já tem um atendimento às ${time}. Escolha outro horário ou profissional.`)
      return
    }

    onSave({
      id: Date.now(),
      time,
      service,
      pet: pet.trim(),
      species: 'A confirmar',
      guardian: guardian.trim(),
      staff,
      status: 'Pré-agendado',
      note: 'Novo registro de demonstração. Completar informações na recepção.',
    })
  }

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <div className="form-intro">
        <h2>Adicionar atendimento</h2>
        <p>O registro fica somente nesta demonstração.</p>
      </div>
      <label>
        Nome do pet
        <input autoFocus required value={pet} onChange={(event) => setPet(event.target.value)} placeholder="Ex.: Mel" />
      </label>
      <label>
        Responsável
        <input required value={guardian} onChange={(event) => setGuardian(event.target.value)} placeholder="Nome para identificação" />
      </label>
      <label>
        Serviço
        <select value={service} onChange={(event) => setService(event.target.value)}>
          <option>Banho e tosa</option>
          <option>Consulta</option>
          <option>Vacinação</option>
          <option>Cirurgia de pequeno porte</option>
        </select>
      </label>
      <div className="form-row">
        <label>
          Horário
          <input required type="time" value={time} onChange={(event) => setTime(event.target.value)} />
        </label>
        <label>
          Profissional
          <select value={staff} onChange={(event) => setStaff(event.target.value)}>
            {STAFF.filter((member) => member.role !== 'Recepção').map((member) => (
              <option key={member.name}>{member.name}</option>
            ))}
          </select>
        </label>
      </div>
      {error && <p className="form-error" role="alert"><AlertTriangle size={16} />{error}</p>}
      <p className="form-note"><AlertTriangle size={15} /> Pet, responsável e horário são dados fictícios neste protótipo. Não insira dados reais.</p>
      <div className="form-actions">
        <button className="button button--quiet" type="button" onClick={onCancel}>Cancelar</button>
        <button className="button button--primary" type="submit"><Check size={16} /> Salvar horário</button>
      </div>
    </form>
  )
}

function AppointmentDetail({ appointment, onComplete, onNew }) {
  if (!appointment) {
    return (
      <div className="detail-empty">
        <div className="detail-empty-mark"><PawPrint size={22} /></div>
        <h2>Escolha um horário</h2>
        <p>Selecione uma ficha da agenda para ver o contexto do atendimento.</p>
        <button className="text-action" type="button" onClick={onNew}><Plus size={16} /> Novo atendimento</button>
      </div>
    )
  }

  return (
    <div className="appointment-detail">
      <div className="detail-topline">
        <span className={`status status--${statusClass(appointment.status)}`}>{appointment.status}</span>
      </div>
      <div className="pet-identity">
        <div className="pet-avatar">{appointment.species === 'Gato' ? <Cat size={25} /> : <Dog size={25} />}</div>
        <div><h2>{appointment.pet}</h2><p>{appointment.species} <span aria-hidden="true">·</span> dados demonstrativos</p></div>
      </div>
      <div className="detail-service"><ServiceIcon service={appointment.service} size={18} /><div><span>Serviço</span><strong>{appointment.service}</strong></div></div>
      <dl className="detail-list">
        <div><dt><Clock3 size={15} /> Horário</dt><dd>Hoje, {appointment.time}</dd></div>
        <div><dt><Users size={15} /> Profissional</dt><dd>{appointment.staff}</dd></div>
        <div><dt><PawPrint size={15} /> Responsável</dt><dd>{appointment.guardian}</dd></div>
      </dl>
      <section className="care-note">
        <div><HeartPulse size={15} /><span>CONTEXTO DE CUIDADO</span></div>
        <p>{appointment.note}</p>
      </section>
      {appointment.status !== 'Concluído' && (
        <button className="button button--complete" type="button" onClick={() => onComplete(appointment.id)}>
          <CheckCircle2 size={17} /> Marcar como concluído
        </button>
      )}
      <p className="detail-disclaimer">A ficha não substitui o prontuário oficial. Confirme as informações com o tutor.</p>
    </div>
  )
}

function App() {
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS)
  const [activeView, setActiveView] = useState('Visão geral')
  const [filter, setFilter] = useState('Todos')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(INITIAL_APPOINTMENTS[1].id)
  const [isCreating, setIsCreating] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const [ascending, setAscending] = useState(true)

  const selectedAppointment = appointments.find((appointment) => appointment.id === selectedId)
  const sortedAppointments = useMemo(() => [...appointments].sort((a, b) => (
    ascending ? a.time.localeCompare(b.time) : b.time.localeCompare(a.time)
  )), [appointments, ascending])
  const matchingAppointments = useMemo(() => sortedAppointments.filter((appointment) => {
    const matchesFilter = filter === 'Todos' || appointment.service === filter
    const searchText = `${appointment.pet} ${appointment.guardian} ${appointment.service} ${appointment.staff}`.toLocaleLowerCase('pt-BR')
    return matchesFilter && searchText.includes(query.toLocaleLowerCase('pt-BR'))
  }), [filter, query, sortedAppointments])
  const groomingCount = appointments.filter((appointment) => appointment.service === 'Banho e tosa').length
  const inProgressCount = appointments.filter((appointment) => appointment.status === 'Em atendimento').length

  function addAppointment(appointment) {
    setAppointments((current) => [...current, appointment])
    setSelectedId(appointment.id)
    setActiveView('Agenda')
    setIsCreating(false)
    setAnnouncement(`Horário de ${appointment.pet} às ${appointment.time} incluído na agenda demonstrativa.`)
  }

  function completeAppointment(id) {
    setAppointments((current) => current.map((appointment) => (
      appointment.id === id ? { ...appointment, status: 'Concluído' } : appointment
    )))
    setAnnouncement(`Atendimento de ${selectedAppointment?.pet ?? 'pet'} marcado como concluído.`)
  }

  function openView(view) {
    setActiveView(view)
    setIsCreating(false)
    setAnnouncement('')
  }

  const dateLabel = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#inicio" onClick={(event) => { event.preventDefault(); openView('Visão geral') }} aria-label="PetVida, visão geral">
          <span className="brand-mark">PV</span>
          <span className="brand-name">petvida<span>clínica + cuidado</span></span>
        </a>
        <div className="branch-switcher"><span className="branch-dot" /><span>Unidade principal<small>Operação local</small></span><ChevronRight size={15} /></div>
        <nav className="primary-nav" aria-label="Navegação principal">
          <span className="nav-label">ESPAÇO DE TRABALHO</span>
          <button className={`nav-link ${activeView === 'Visão geral' ? 'nav-link--active' : ''}`} type="button" onClick={() => openView('Visão geral')}><LayoutDashboard size={18} /> Visão geral</button>
          <button className={`nav-link ${activeView === 'Agenda' ? 'nav-link--active' : ''}`} type="button" onClick={() => openView('Agenda')}><CalendarDays size={18} /> Agenda <span className="nav-count">{appointments.length}</span></button>
          <button className={`nav-link ${activeView === 'Pacientes' ? 'nav-link--active' : ''}`} type="button" onClick={() => openView('Pacientes')}><PawPrint size={18} /> Pacientes</button>
          <button className={`nav-link ${activeView === 'Equipe' ? 'nav-link--active' : ''}`} type="button" onClick={() => openView('Equipe')}><Users size={18} /> Equipe</button>
        </nav>
        <div className="sidebar-bottom">
          <div className="side-reminder"><span className="reminder-icon"><Bell size={16} /></span><div><strong>Lembretes preventivos</strong><p>Automação não conectada</p></div><span className="offline-dot" /></div>
          <div className="profile-chip"><span className="profile-initials">RC</span><span><strong>Recepção</strong><small>Perfil demonstrativo</small></span><span className="profile-menu">•••</span></div>
        </div>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <div className="breadcrumb"><span>PetVida</span><ChevronRight size={14} /><strong>{activeView}</strong></div>
          <div className="topbar-right"><span className="live-indicator"><i /> Agenda de demonstração</span><button className="icon-button" type="button" disabled aria-label="Notificações não conectadas" title="Notificações não conectadas"><Bell size={18} /><span /></button><span className="top-avatar">R</span></div>
        </header>

        <div className="page-content">
          <div className="page-heading">
            <div><p className="date-line"><span className="date-dot" /> {dateLabel}</p><h1>{activeView === 'Visão geral' ? 'Bom dia, equipe.' : activeView}</h1><p className="heading-subtitle">{activeView === 'Pacientes' ? 'Encontre rapidamente o contexto de cada visita.' : activeView === 'Equipe' ? 'Distribuição de atendimentos da unidade.' : 'O cuidado de hoje, em um só lugar.'}</p></div>
            <button className="button button--primary new-booking" type="button" onClick={() => { setIsCreating(true); setAnnouncement('') }}><Plus size={17} /> Novo atendimento</button>
          </div>

          <div className="demo-banner" role="note"><span className="demo-banner-icon"><AlertTriangle size={16} /></span><p><strong>Ambiente demonstrativo.</strong> Agenda e fichas usam dados fictícios no navegador. Não utilize informações reais de pacientes.</p><span className="demo-tag">DEMO</span></div>
          {announcement && <p className="announcement" role="status"><CheckCircle2 size={16} />{announcement}<button type="button" aria-label="Fechar aviso" onClick={() => setAnnouncement('')}><X size={15} /></button></p>}

          {(activeView === 'Visão geral' || activeView === 'Agenda') && (
            <>
              <section className="overview-strip" aria-label="Resumo da agenda demonstrativa">
                <div className="overview-item"><span className="overview-icon overview-icon--green"><CalendarDays size={17} /></span><div><strong>{appointments.length}</strong><span>horários na agenda</span></div></div>
                <div className="overview-item"><span className="overview-icon overview-icon--coral"><Scissors size={17} /></span><div><strong>{groomingCount}</strong><span>banhos e tosas</span></div></div>
                <div className="overview-item"><span className="overview-icon overview-icon--blue"><Activity size={17} /></span><div><strong>{inProgressCount}</strong><span>em atendimento</span></div></div>
                <div className="overview-aside"><span className="schedule-key"><i className="key-dot key-dot--open" /> Horário disponível</span><span className="schedule-key"><i className="key-dot key-dot--busy" /> Em atendimento</span></div>
              </section>

              <section className="operations-layout" aria-label="Agenda compartilhada">
                <div className="schedule-panel">
                  <div className="schedule-heading">
                    <div><div className="heading-title-row"><h2>{activeView === 'Agenda' ? 'Todos os horários' : 'Agenda de hoje'}</h2><span className="synthetic-label">EXEMPLO</span></div><p>Atendimentos ordenados por horário</p></div>
                    <button className="sort-button" type="button" onClick={() => setAscending((current) => !current)} aria-label={ascending ? 'Ordenar do mais tarde para o mais cedo' : 'Ordenar do mais cedo para o mais tarde'} title="Alternar ordem dos horários"><ArrowDownUp size={16} /><span>{ascending ? 'Mais cedo' : 'Mais tarde'}</span></button>
                  </div>
                  <div className="schedule-tools">
                    <div className="search-field"><Search size={17} /><input aria-label="Buscar na agenda" placeholder="Buscar pet, serviço ou profissional" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
                    <div className="filter-tabs" role="group" aria-label="Filtrar por serviço">
                      {FILTERS.map((item) => <button key={item} className={filter === item ? 'filter-tab filter-tab--active' : 'filter-tab'} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
                    </div>
                  </div>
                  <div className="rail-head"><span>HORÁRIO</span><span>ATENDIMENTO</span><span>SERVIÇO</span><span>RESPONSÁVEL</span><span>STATUS</span></div>
                  <div className="ticket-list">
                    {matchingAppointments.map((appointment, index) => (
                      <div className="ticket-row" key={appointment.id}>
                        {index === 0 && <span className="rail-start" aria-hidden="true" />}
                        <AppointmentTicket appointment={appointment} selected={selectedId === appointment.id && !isCreating} onSelect={() => { setSelectedId(appointment.id); setIsCreating(false) }} />
                      </div>
                    ))}
                    {!query && filter === 'Todos' && <button className="open-slot-row" type="button" onClick={() => { setIsCreating(true); setAnnouncement('') }}><span className="open-slot-time">12:30</span><span className="open-slot-dot" /><span className="open-slot-label"><strong>Horário disponível</strong><small>Faixa livre de demonstração</small></span><span className="open-slot-action"><Plus size={14} /> Adicionar</span></button>}
                    {matchingAppointments.length === 0 && <div className="empty-state"><Search size={21} /><strong>Nenhum horário encontrado</strong><span>Experimente outro termo ou filtro.</span><button className="text-action" type="button" onClick={() => { setQuery(''); setFilter('Todos') }}>Limpar busca</button></div>}
                  </div>
                  <div className="rail-footer"><span><i className="rail-end-dot" /> Fim dos horários demonstrativos</span><button type="button" onClick={() => { setIsCreating(true); setAnnouncement('') }}><Plus size={15} /> Adicionar horário</button></div>
                </div>

                <aside className={`detail-panel ${isCreating ? 'detail-panel--form' : ''}`} aria-label={isCreating ? 'Novo atendimento' : 'Detalhes do atendimento'}>
                  {isCreating ? <AppointmentForm appointments={appointments} onSave={addAppointment} onCancel={() => setIsCreating(false)} /> : <AppointmentDetail appointment={selectedAppointment} onComplete={completeAppointment} onNew={() => setIsCreating(true)} />}
                </aside>
              </section>
            </>
          )}

          {activeView === 'Pacientes' && <PatientsView appointments={sortedAppointments} query={query} setQuery={setQuery} onSelect={(id) => { setSelectedId(id); setActiveView('Agenda') }} />}
          {activeView === 'Equipe' && <TeamView appointments={appointments} />}

          <footer className="page-footer"><span>PetVida · Protótipo de operação</span><span>Dados sintéticos · Sem conexão com prontuário, calendário ou notificações</span></footer>
        </div>
      </main>
    </div>
  )
}

function PatientsView({ appointments, query, setQuery, onSelect }) {
  const uniquePets = appointments.filter((appointment, index, all) => all.findIndex((item) => item.pet.toLowerCase() === appointment.pet.toLowerCase()) === index)
  const pets = uniquePets.filter((appointment) => `${appointment.pet} ${appointment.species} ${appointment.service}`.toLocaleLowerCase('pt-BR').includes(query.toLocaleLowerCase('pt-BR')))

  return (
    <section className="directory-panel">
      <div className="directory-heading"><div><h2>Pacientes da demonstração</h2><p>Perfis ilustrativos vinculados aos horários de hoje.</p></div><div className="search-field directory-search"><Search size={17} /><input aria-label="Buscar pacientes" placeholder="Buscar paciente" value={query} onChange={(event) => setQuery(event.target.value)} /></div></div>
      <div className="directory-list">
        {pets.map((pet) => <button className="directory-row" key={pet.id} type="button" onClick={() => onSelect(pet.id)}><span className="directory-pet-icon"><PawPrint size={19} /></span><span className="directory-name"><strong>{pet.pet}</strong><small>{pet.species} · cadastro sintético</small></span><span className="directory-last"><small>Próximo registro</small><strong>{pet.service} · {pet.time}</strong></span><ChevronRight size={17} /></button>)}
        {pets.length === 0 && <div className="empty-state"><Search size={21} /><strong>Nenhum paciente encontrado</strong><span>Confira a busca e tente novamente.</span></div>}
      </div>
      <p className="directory-disclaimer"><AlertTriangle size={15} /> Todos os perfis desta tela são fictícios e não representam prontuários médicos.</p>
    </section>
  )
}

function TeamView({ appointments }) {
  return (
    <section className="directory-panel team-panel">
      <div className="directory-heading"><div><h2>Equipe da unidade</h2><p>Composição informada no estudo de caso. Carga exibida com dados fictícios.</p></div><span className="team-total"><Users size={17} /> {STAFF.length} perfis de equipe</span></div>
      <div className="team-grid">
        {STAFF.map((member) => {
          const assigned = appointments.filter((appointment) => appointment.staff === member.name).length
          return <article className="team-row" key={member.name}><span className={`team-avatar team-avatar--${member.color}`}>{member.short}</span><span className="team-member-name"><strong>{member.name}</strong><small>{member.role}</small></span><span className="team-load"><strong>{assigned}</strong><small>{assigned === 1 ? 'horário demonstrativo' : 'horários demonstrativos'}</small></span><span className={`team-availability ${assigned ? 'team-availability--busy' : ''}`}><i />{assigned ? 'Na agenda' : 'Sem horários'}</span></article>
        })}
      </div>
      <p className="directory-disclaimer"><AlertTriangle size={15} /> Nomes de plantonistas, tosadores e recepção são rótulos de exemplo; não identificam pessoas reais.</p>
    </section>
  )
}

export default App