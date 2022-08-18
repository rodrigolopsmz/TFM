
import puppeteer from 'puppeteer'
export const WebScrappingFunction = async (nameOfSearch)=>{

    
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto("https://www.poderjudicial.es/search/indexAN.jsp")
    await page.evaluate( ()=> {
        document.querySelectorAll('.close')[0].click()
    })
    await page.waitForSelector('#frmBusquedajurisprudencia_TEXT').catch((error)=>{
        console.log(error)
    })
    await page.waitForSelector('#COMUNIDADpanel').catch((error)=>{
        console.log(error)
    })
    await page.waitForSelector('ul.multiselect-container.dropdown-menu').catch((error)=>{
        console.log(error)
    })

    //Comienzo los clickeos necesarios para llegar a clickar sobre la ciudad de barcelona como opcion
    await page.evaluate ( ()=> {
         document.getElementById('COMUNIDADpanel').children[8].getElementsByTagName('a')[0].click()
    })
    await page.waitForSelector('#listCOM_CATALUÑA a').catch((error)=>{
        console.log(error)
    })
    await page.evaluate ( ()=> {
       document.getElementById('listCOM_CATALUÑA').querySelectorAll('a')[0].click()
       
    })
    await page.waitForSelector('#chkSEDE_BARCELONA').catch((error)=>{
        console.log(error)
    })
    await page.evaluate( (nameOfSearch)=> {
        

        //Clickeo opcion Civil
        document.querySelectorAll('ul.multiselect-container.dropdown-menu')[0].getElementsByTagName('input')[0].click()
        //Clickeo Audiencia provincial
        document.querySelectorAll('ul.multiselect-container.dropdown-menu')[2].getElementsByTagName('input')[21].click()
        //Clickeo ciudad de barcelona
        document.getElementById('chkSEDE_BARCELONA').click()
        document.getElementById('frmBusquedajurisprudencia_TEXT').value = nameOfSearch
        //Clickeo numero de respuestas 
        document.querySelector('[data-id="frmBusquedajurisprudencia_recordsPerPage"]').click()
        document.querySelector('[data-id="frmBusquedajurisprudencia_recordsPerPage"]').parentElement.querySelectorAll('li')[3].querySelector('a').click()
       
    },nameOfSearch)
    await new Promise(resolve => setTimeout(resolve, 300));
    await page.evaluate(() => {
         document.getElementById('srcjur_search').click()
     })
     
   var nextPagination = 0
   const links = []
   while (nextPagination === 0)
   {
        await new Promise(resolve => setTimeout(resolve, 60000));
        await page.waitForSelector('#jurisprudenciaresults_searchresults').catch((error)=>{
            console.log(error)
        })
        var linksList = await page.evaluate(()=> {
            const hrefList = []
            const aList = document.querySelectorAll('#jurisprudenciaresults_searchresults a')
            aList.forEach(el=>{
                var linkText = el.getAttribute('href')
                if (linkText.includes('https://www.poderjudicial.es/search/AN/openDocument/')) hrefList.push(linkText)
            })
            return hrefList
        })
        links.push(...linksList)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        nextPagination =  await page.evaluate( ()=> {
                if (document.querySelector('#jurisprudenciaresults_bottompagination li.next.navigation a[data-original-title="Página siguiente"]' ) !==null)
                {
                    document.querySelector('#jurisprudenciaresults_bottompagination li.next.navigation a[data-original-title="Página siguiente"]' ).click()
                    return 0;
                }
                else return 1;
            })
        
        
        
   }
   await page.close()
   await browser.close()
   return links
    
}