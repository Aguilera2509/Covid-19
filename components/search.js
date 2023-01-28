import { useState } from "react"

export function SearchCountry({ allCountries, totalConfirmed, totalDeaths }){
    const [search, setSearch] = useState("")
    const [inde, setInde] = useState(null)
    const countries = []

    allCountries !== undefined ? allCountries.forEach(el =>{
        countries.push(el.Slug)
    }) : ""

    function handleSubmit(e){
        e.preventDefault()
        setInde(countries.indexOf(search.toLocaleLowerCase()))
    }
    
    return(
        <div className="mb-3">
            <form onSubmit={handleSubmit}>
                <label htmlFor="exampleFormControlInput1" className="form-label">Search in specific country TC and TD:</label>
                <input type="search" required className="form-control" name="search" id="exampleFormControlInput1" value={search} onChange={(e) => {setSearch(e.target.value)}} />
                <br/>
                <input type="submit" className="btn btn-info" value="Submit" />
            </form>

            <br/>

            {inde !== null &&
            <table className="table table-warning">
                <thead>
                    <tr>
                        <th scope="col">Country</th>
                        <th scope="col">Total Confirmed (TC)</th>
                        <th scope="col">Total Deaths (TD)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{countries[inde]}</td>
                        <td>{totalConfirmed[inde]}</td>
                        <td>{totalDeaths[inde]}</td>
                    </tr>
                </tbody>
            </table>
            }

        </div>
    )
}