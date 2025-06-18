
const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys')
const { menuPrincipal, planesPremium } = require('./menu')
const entregarCuenta = require('./entrega')
const { state, saveState } = useSingleFileAuthState('./auth.json')

async function start() {
  const sock = makeWASocket({ auth: state })
  sock.ev.on('creds.update', saveState)

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message) return
    const text = msg.message.conversation?.trim().toLowerCase()
    const sender = msg.key.remoteJid

    if (!text) return

    if (text === 'menu') {
      await sock.sendMessage(sender, { text: menuPrincipal() })
    } else if (text === '2') {
      await sock.sendMessage(sender, { text: planesPremium() })
    } else if (text === 'comprobante') {
      const entrega = entregarCuenta()
      const mensaje = entrega || "⚠️ No hay cuentas SSH disponibles."
      await sock.sendMessage(sender, { text: mensaje })
    }
  })
}

start()
