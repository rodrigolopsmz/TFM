//const puppeteer = require('puppeteer')
import { ConnectionCheckOutFailedEvent } from 'mongodb';
import puppeteer from 'puppeteer'

export const pdfParser = async (URL) =>  {
    
    const browser = await puppeteer.launch({
  
        headless: false})
    const page = await browser.newPage()
    page.setDefaultNavigationTimeout(120000); 
    await page.goto(URL).catch(error=>{console.log(error)
        process.exit();})
    
    // await page.evaluate(async ()=> {
    //     window.onload = () => {console.log('fullLOad')}
    //      console.log('FIrst')
    //         while (document.readyState !== 'complete')
    //         {
    //             console.log('second')
    //             await new Promise(resolve => setTimeout(resolve, 5000));
    //             location.reload(true)
    //         }
    //         console.log('third')
            
          
    //     }).catch(error=>console.log(error))

       
    
    // await page.waitForNavigation({
    //         waitUntil: 'networkidle2',
    //       }).catch(error=>console.log(error));
    
    // await page.waitForSelector('.close').catch((error)=>{
    //     console.log(error)
    // })
    // await page.evaluate(async ()=> {

    //     if (document.querySelectorAll('.close').length>0) document.querySelectorAll('.close')[0].click()

    // }).catch(error=>{console.log(error)
    // process.exit();})

    await page.waitForSelector('#objtcontentpdf a').catch((error)=>{
        console.log(error)
        process.exit();
    })

    const urlSecond = await page.evaluate(async ()=> {
        const urlObtained = document.getElementById('objtcontentpdf').querySelectorAll('a')[0].getAttribute('href')
        return urlObtained
    }).catch((error)=>{
        console.log(error)
        process.exit();
    })
    const urlConcatenate = urlSecond.split('search')[1]
    await page.goto('https://www.poderjudicial.es/search'+urlConcatenate).catch(error=>{console.log(error)
    process.exit();})
    const textObtained = await page.evaluate(async ()=> {
        console.log('Here1')
        const textScrapping = []
        window.addEventListener("message", (event) => {
            textScrapping.push(event.data.selectedText);
          }, false);
          
          const script = document.createElement('script');
          
          script.textContent = `(${() => {
            document.querySelectorAll('embed')[0].postMessage({type: 'selectAll'});
            document.querySelectorAll('embed')[0].postMessage({type: 'getSelectedText'}, '*');
                }})()`;
          document.documentElement.appendChild(script);
          script.remove();
                console.log('here2')
          await new Promise(resolve => setTimeout(resolve, 20000));
          console.log('here3')
          if (textScrapping.length === 0)  return new Error;
          return textScrapping
    }).catch((error)=>{
        console.log(error)
        process.exit();
    })
    await page.close()
    await browser.close()
    const textFiltered = textObtained.filter(text => text !== null)
    return textFiltered;
    

}