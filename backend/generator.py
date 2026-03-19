import qrcode
import io
from urllib.parse import urlparse


# Função que valida a url
def validate(url):
    parsed = urlparse(url)
    return parsed.scheme in ("http", "https") and bool(parsed.netloc)


def generate(url):
    # Não faz nada caso a url não seja válida
    if not validate(url):
        return

    # Pré-configura o qrcode
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=1,
    )
    # Cria o qrcode usando a url recebida
    qr.add_data(url)
    qr.make(fit=True)  # Faz o qrcode ocupar a imagem toda
    img = qr.make_image(fill_color="black", back_color="white")

    # Quebra a imagem em bytes para responder ao front-end
    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    buffer.seek(0)

    return buffer
