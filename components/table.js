import { Err } from "./error";
import { Loader } from "./loader";

export function TotalData({ allData, setSeeMap, err }){

    if(allData["ID"] !== undefined && !err){
        setTimeout(()=>{
            setSeeMap(true)
        }, 4000)
    }

    return(
        <table className="table table-dark">
            <thead>
                <tr style={{"textAlign": "center"}}>
                    <th scope="col">Date</th>
                    <th scope="col">Total Confirmed (TC)</th>
                    <th scope="col">Total Deaths (TD)</th>
                    <th scope="col">Total Recovered</th>
                </tr>
            </thead>
            <tbody>
                {err &&
                    <tr>
                        <td colSpan="4"> 
                            <Err />       
                        </td>
                    </tr>
                }
                {allData["ID"] === undefined  && !err &&
                    <tr>
                        <td colSpan="4" style={{"textAlign": "center"}}> 
                            <Loader />
                        </td>
                    </tr>
                }
                {allData["ID"] !== undefined && !err &&
                    <tr>
                        <th scope="row">{allData.Date.substring(0, 10)}</th>
                        <td>{allData.Global.TotalConfirmed}</td>
                        <td>{allData.Global.TotalDeaths}</td>
                        <td>{allData.Global.TotalRecovered}</td>
                    </tr>
                }
            </tbody>
        </table>
    )
}