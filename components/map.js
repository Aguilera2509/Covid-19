import { useEffect, useState } from "react"
import { SearchCountry } from "./search"

export function MapWorld({ allCountries, setErrMap }){
  const [identifier, setIdentifier] = useState(false)
  const [componentSearch, setComponentSearch] = useState(false)
  const [seeMapCodes, setSeeMapCodes] = useState(true)
  const codeCountry = []
  const totalConfirmed = []
  const totalDeaths = []
  let inde = null

  allCountries !== undefined ? allCountries.forEach(el =>{
    codeCountry.push(el.CountryCode)
    totalConfirmed.push(el.TotalConfirmed)
    totalDeaths.push(el.TotalDeaths)
  }) : ""

  function handleChangeIdentifier(e){
    const onChange = e.target.checked
    setIdentifier(onChange)
    setSeeMapCodes(false)
  }

  function handleChangeSearch(e){
    const onChange = e.target.checked
    setComponentSearch(onChange)
  }

  useEffect(()=>{
    let jvm
    if(window.jsVectorMap){
      if(identifier === true){
        try {
          jvm = new jsVectorMap({
          map: "world",
          selector: "#map",
          zoomButtons: true,
          regionsSelectable: true, 
          regionStyle: {
            initial: {
              fill: "#989ca3"
            },
            hover: {
              fill: "#FF0000"
            },
            selected: {
              fill: "yellow"
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

        } catch (error) {
          setErrMap(true)
        }

      }else{
        try {
          jvm = new jsVectorMap({
          map: "world",
          selector: "#mapTwo",
          zoomButtons: true, 
          regionsSelectable: true, 
          regionStyle: {
            initial: {
              fill: "#989ca3"
            },
            hover: {
              fill: "#FF0000"
            },
            selected: {
              fill: "yellow"
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
        
        if(seeMapCodes === true){
          let name = jvm.regions
          for (const key in name) {
            inde = codeCountry.indexOf(key)
            codeCountry.indexOf(key) > -1 ? name[key].config.name = name[key].config.name + " TC: " + totalConfirmed[inde] + " TD: " + totalDeaths[inde] : name[key].config.name = name[key].config.name + " N0t DATA"
          }
        }

        } catch (error) {
          setErrMap(true)
        }
      }
    }
    }, [identifier])

    return(
      <>
        {identifier === true &&
          <div id="map"></div>
        }
        {identifier === false &&
          <div id="mapTwo"></div>
        }
        {componentSearch === true &&
          <SearchCountry allCountries={allCountries} totalConfirmed={totalConfirmed} totalDeaths={totalDeaths} />
        }
        <div>
          <input type="checkbox" id="seeIdentifier" name="seeIdentifier" onChange={handleChangeIdentifier} />
          <label htmlFor="seeIdentifier">See Identifier</label>
        </div>

        <div>
          <input type="checkbox" id="searchCountry" name="searchCountry" onChange={handleChangeSearch} />
          <label htmlFor="searchCountry">Search Country</label>
        </div>
      </>
    )
}