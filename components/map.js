import { useEffect } from "react"

export function MapWorld({ allCountries, setErrMap }){
  const codeCountry = []
  const totalConfirmed = []
  const totalDeaths = []
  let inde = null
  let jvm

  allCountries !== undefined ? allCountries.forEach(el =>{
    codeCountry.push(el.CountryCode)
    totalConfirmed.push(el.TotalConfirmed)
    totalDeaths.push(el.TotalDeaths)
  }) : ""

  useEffect(()=>{
    if(window.jsVectorMap){
      try {
        jvm = new jsVectorMap({
          map: "world",
          selector: "#map",
          zoomButtons: true,  
          
          regionStyle: {
            initial: {
              fill: "#989ca3"
            },
            hover: {
              fill: "#FF0000"
            }
          },
    
          labels: {
            regions: {
              render(code) {    
                return codeCountry.filter(el => el === code ? el : "") 
              }
            }
          },
      
          regionLabelStyle: {
            initial: {
              fontFamily: 'Verdana',
              fontSize: '14',
              fontWeight: 'bold',
              fill: "#0A0A0A"
            },
            hover: {
              fill: "blue"
            }
          }
        })

      let name = jvm.regions

      for (const key in name) {
        inde = codeCountry.indexOf(key)
        codeCountry.indexOf(key) > -1 ? name[key].config.name = name[key].config.name + " TC: " + totalConfirmed[inde] + " TD: " + totalDeaths[inde] : name[key].config.name = name[key].config.name + " N0t DATA"
      }

      } catch (error) {
        setErrMap(true)
      }
    }
    }, [])

    return(
      <div id="map"></div>
    )
}