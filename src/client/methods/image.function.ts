import { create_QR } from "./qr.function";
import { boleto_template } from "../template/boleto.template";
import puppeteer from "puppeteer";
import { uploadImage_Firebase } from "./save_image.function";

export async function convert_Image(Data: any) {
    let launchOptions = {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      };
  
      const qrDataURL = await create_QR(Data);
  
      const htmlContent = boleto_template(Data, qrDataURL);
  
      const browser = await puppeteer.launch(launchOptions);
      const page = await browser.newPage();
      await page.setContent(htmlContent);
  
      const screenshotBuffer = await page.screenshot({
        type: 'jpeg',
        quality: 90,
      });
  
      const screenshotBase64 = screenshotBuffer.toString('base64');
  
      await browser.close();

      let file_name = 'boleto.jpg';

      let path_urlImage = await uploadImage_Firebase(screenshotBase64, file_name);

      return path_urlImage;
  
}