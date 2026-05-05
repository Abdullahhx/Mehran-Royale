from PIL import Image
def crop_image(input_path, output_path):
    img = Image.open(input_path)
    w, h = img.size
    cropped = img.crop((35, 0, 1883, h - 50))
    cropped.save(output_path)
    print('Cropped and saved to ' + output_path)
crop_image('public/images/Screenshot (54).png', 'public/images/wedding-2.png')
