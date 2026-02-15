from PIL import Image, ImageOps
from pathlib import Path
from typing import Tuple

def load_image(image_path: Path) -> Image.Image:
  return Image.open(image_path)

def save_image(image: Image.Image, output_path: Path) -> None:
  image.save(output_path)

def resize_image(
    image: Image.Image,
    width: int,
    height: int
) -> Image.Image:
  return image.resize((width, height))

def crop_image(
    image: Image.Image,
    left: int,
    right: int,
    top: int,
    bottom: int
) -> Image.Image:
  return image.crop((left, right, top, bottom))

def rotate_image(
    image: Image.Image,
    angle: int
) -> Image.Image:
  return image.rotate(angle, expand=True)

def grayscale_image(image: Image.Image) -> Image.Image:
  return image.convert("L").convert("RGB")

def sepia_image(image: Image.Image) -> Image.Image:
    sepia = image.convert("RGB")
    pixels = sepia.load()

    for y in range(sepia.height):
        for x in range(sepia.width):
            r, g, b = pixels[x, y]

            tr = int(0.393 * r + 0.769 * g + 0.189 * b)
            tg = int(0.349 * r + 0.686 * g + 0.168 * b)
            tb = int(0.272 * r + 0.534 * g + 0.131 * b)

            pixels[x, y] = (
                min(255, tr),
                min(255, tg),
                min(255, tb)
            )

    return sepia

def flip_horizontal(image: Image.Image) -> Image.Image:
   return image.transpose(Image.FLIP_LEFT_RIGHT)

def flip_vertical(image: Image.Image) -> Image.Image:
    return image.transpose(Image.FLIP_TOP_BOTTOM)

def mirror_image(image: Image.Image) -> Image.Image:
    return ImageOps.mirror(image)

def convert_format(image: Image.Image, output_format: str) -> Image.Image:
   return image.convert("RGB") if output_format.lower() in ["jpeg", "jpg"] else image

def save_image_with_options(image, output_path, output_format, quality=None):
    output_format = output_format.lower()

    if output_format in ["jpeg", "jpg"]:
        image = image.convert("RGB")  # JPEG does not support alpha
        quality = int(quality) if quality else 85

        if quality < 1 or quality > 95:
            raise ValueError("Quality must be between 1 and 95")

        image.save(output_path, format="JPEG", quality=quality)

    else:
        image.save(output_path, format=output_format.upper())

    return output_path
