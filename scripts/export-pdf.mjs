import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputPath = path.join(projectRoot, 'petvida-aplicativo.pdf')
const desktopPath = path.join(projectRoot, '.impeccable', 'review', 'desktop.png')
const mobilePath = path.join(projectRoot, '.impeccable', 'review', 'mobile.png')
const pdf = await PDFDocument.create()
const regularFont = await pdf.embedFont(StandardFonts.Helvetica)
const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold)
const pageWidth = 595.28
const pageHeight = 841.89
const forest = rgb(18 / 255, 56 / 255, 47 / 255)
const green = rgb(23 / 255, 72 / 255, 59 / 255)
const lime = rgb(217 / 255, 239 / 255, 129 / 255)
const ink = rgb(32 / 255, 43 / 255, 39 / 255)
const muted = rgb(105 / 255, 119 / 255, 113 / 255)
const canvas = rgb(245 / 255, 247 / 255, 242 / 255)
const white = rgb(1, 1, 1)

async function readCapture(filePath, label) {
  try {
    return await fs.readFile(filePath)
  } catch {
    throw new Error(`Captura obrigatória ausente (${label}): ${filePath}`)
  }
}

function drawHeader(page, title, subtitle, pageNumber) {
  page.drawRectangle({ x: 0, y: pageHeight - 128, width: pageWidth, height: 128, color: forest })
  page.drawRectangle({ x: 36, y: pageHeight - 69, width: 39, height: 39, color: lime })
  page.drawText('PV', { x: 45, y: pageHeight - 56, size: 15, font: boldFont, color: forest })
  page.drawText('PETVIDA | CLINICA + CUIDADO', { x: 88, y: pageHeight - 48, size: 9, font: boldFont, color: lime })
  page.drawText(title, { x: 36, y: pageHeight - 96, size: 21, font: boldFont, color: white })
  page.drawText(subtitle, { x: 36, y: pageHeight - 115, size: 9, font: regularFont, color: white })
  page.drawText(`${pageNumber} / 2`, { x: pageWidth - 59, y: 24, size: 8, font: regularFont, color: muted })
}

function drawNotice(page, text, yPosition) {
  page.drawRectangle({ x: 36, y: yPosition - 12, width: pageWidth - 72, height: 30, color: rgb(1, 0.976, 0.906) })
  page.drawText(text, { x: 46, y: yPosition - 2, size: 8, font: regularFont, color: rgb(0.38, 0.33, 0.18) })
}

const desktopImage = await pdf.embedPng(await readCapture(desktopPath, 'desktop'))
const desktopPage = pdf.addPage([pageWidth, pageHeight])
desktopPage.drawRectangle({ x: 0, y: 0, width: pageWidth, height: pageHeight, color: canvas })
drawHeader(desktopPage, 'Central de operações', 'Protótipo navegável da agenda compartilhada PetVida', 1)
desktopPage.drawText('TELA DESKTOP', { x: 36, y: 686, size: 8, font: boldFont, color: green })
const desktopScale = Math.min((pageWidth - 72) / desktopImage.width, 405 / desktopImage.height)
const desktopDimensions = desktopImage.scale(desktopScale)
desktopPage.drawImage(desktopImage, {
  x: (pageWidth - desktopDimensions.width) / 2,
  y: 252,
  width: desktopDimensions.width,
  height: desktopDimensions.height,
})
drawNotice(desktopPage, 'Dados fictícios. Sem prontuário real, autenticação ou envio de lembretes.', 202)
desktopPage.drawText('Agenda por horario | Busca e filtros | Cadastro com bloqueio de conflito', {
  x: 36,
  y: 160,
  size: 9,
  font: boldFont,
  color: ink,
})
desktopPage.drawText('Este documento mostra telas estáticas; a versão interativa está no GitHub Pages.', {
  x: 36,
  y: 142,
  size: 8,
  font: regularFont,
  color: muted,
})
desktopPage.drawText('PetVida | Estudo de caso', { x: 36, y: 24, size: 8, font: regularFont, color: muted })

const mobileImage = await pdf.embedPng(await readCapture(mobilePath, 'mobile'))
const mobilePage = pdf.addPage([pageWidth, pageHeight])
mobilePage.drawRectangle({ x: 0, y: 0, width: pageWidth, height: pageHeight, color: canvas })
drawHeader(mobilePage, 'Visão para celular', 'A agenda mantém horário, pet e status legíveis em telas menores', 2)
const mobileScale = Math.min(155 / mobileImage.width, 680 / mobileImage.height)
const mobileDimensions = mobileImage.scale(mobileScale)
mobilePage.drawImage(mobileImage, {
  x: 42,
  y: 32,
  width: mobileDimensions.width,
  height: mobileDimensions.height,
})
mobilePage.drawText('FLUXOS DO PROTÓTIPO', { x: 232, y: 666, size: 8, font: boldFont, color: green })
mobilePage.drawText('Agenda compartilhada', { x: 232, y: 638, size: 12, font: boldFont, color: ink })
mobilePage.drawText('Busca, filtros por servico e ordenacao de horarios.', { x: 232, y: 620, size: 8, font: regularFont, color: muted, maxWidth: 315 })
mobilePage.drawText('Ficha do atendimento', { x: 232, y: 576, size: 12, font: boldFont, color: ink })
mobilePage.drawText('Servico, responsavel, profissional e nota demonstrativa.', { x: 232, y: 558, size: 8, font: regularFont, color: muted, maxWidth: 315 })
mobilePage.drawText('Novo horario', { x: 232, y: 514, size: 12, font: boldFont, color: ink })
mobilePage.drawText('Cadastro local com aviso quando o mesmo profissional já está ocupado naquele horário.', { x: 232, y: 496, size: 8, font: regularFont, color: muted, maxWidth: 315, lineHeight: 12 })
mobilePage.drawText('Pacientes e equipe', { x: 232, y: 438, size: 12, font: boldFont, color: ink })
mobilePage.drawText('Visões demonstrativas para localizar perfis e conferir a distribuição de atendimentos.', { x: 232, y: 420, size: 8, font: regularFont, color: muted, maxWidth: 315, lineHeight: 12 })
mobilePage.drawRectangle({ x: 218, y: 336, width: pageWidth - 254, height: 58, color: rgb(1, 0.976, 0.906) })
mobilePage.drawText('AVISO', { x: 230, y: 372, size: 8, font: boldFont, color: rgb(0.38, 0.33, 0.18) })
mobilePage.drawText('Não inclua dados reais de tutores ou animais.', { x: 230, y: 353, size: 8, font: regularFont, color: rgb(0.38, 0.33, 0.18) })
mobilePage.drawText('PetVida | Estudo de caso', { x: 36, y: 24, size: 8, font: regularFont, color: muted })

const pdfBytes = await pdf.save()
await fs.writeFile(outputPath, pdfBytes)
console.log(`PDF criado: ${outputPath}`)
