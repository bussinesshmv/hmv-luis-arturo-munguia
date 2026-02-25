/* ── app.js — HMV Soluciones VCard CEO ── */

/* Compartir */
function compartir() {
    const opts = document.getElementById('shareOptions');
    opts.style.display = opts.style.display === 'flex' ? 'none' : 'flex';
}

function compartirEnRedSocial(red) {
    const url = encodeURIComponent(window.location.href);
    const txt = encodeURIComponent('Conecta con Luis Arturo Munguía Valdés, CEO de HMV Soluciones');
    const urls = {
        facebook:  `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        linkedin:  `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        whatsapp:  `https://api.whatsapp.com/send?text=${txt}%20${url}`,
        twitter:   `https://twitter.com/intent/tweet?text=${txt}&url=${url}`,
        pinterest: `https://pinterest.com/pin/create/button/?url=${url}&description=${txt}`,
    };
    if (urls[red]) window.open(urls[red], '_blank');
    return false;
}

function compartirPorCorreo() {
    const url = window.location.href;
    window.location.href =
        `mailto:?subject=Tarjeta de Contacto — CEO HMV Soluciones` +
        `&body=Hola, te comparto la tarjeta digital de Luis Arturo Munguía Valdés, CEO de HMV Soluciones:%0A${url}`;
    return false;
}

/* QR */
let qrGenerado = false;
function mostrarQR() {
    const el = document.getElementById('qrcode');
    const visible = el.style.display === 'flex' || el.style.display === 'block';
    if (!visible) {
        if (!qrGenerado) {
            new QRCode(el, {
                text: window.location.href,
                width: 200,
                height: 200,
                colorDark:  '#c9e27e',
                colorLight: '#0a0a0a',
                correctLevel: QRCode.CorrectLevel.H
            });
            qrGenerado = true;
        }
        el.style.display = 'flex';
    } else {
        el.style.display = 'none';
    }
}

/* Guardar Contacto */
function guardarContacto() {
    const vcard = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'FN:Luis Arturo Munguía Valdés',
        'N:Munguía Valdés;Luis Arturo;;;',
        'TITLE:Chief Executive Officer',
        'ORG:HMV Soluciones',
        'TEL;TYPE=WORK,VOICE:+525518172592',
        'TEL;TYPE=WORK,VOICE:+524421265644',
        'TEL;TYPE=CELL,VOICE:+525519166477',
        'EMAIL;TYPE=WORK:servicio@hmvsoluciones.com',
        'URL:https://hmvsoluciones.com',
        'ADR;TYPE=WORK:;;CDMX;Michoacán;;Mexico',
        'X-SOCIALPROFILE;type=linkedin:https://www.linkedin.com/company/hmv-soluciones/',
        'END:VCARD'
    ].join('\n');

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Luis_Arturo_Munguia_CEO_HMV.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
}