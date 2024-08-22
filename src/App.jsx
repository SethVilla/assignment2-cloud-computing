
import './App.css'
import {useEffect, useState} from "react";
import axios from "axios"

function App() {
    const [records, setRecords] = useState([]);
    useEffect(() => {
            const config = {
                headers: { Authorization: `Bearer patJp50nHhQ9KwHSg.4983b995ffe07d98ded7e41d06e92d9535f34eef22ee4e75de8cd415e500b79d` }
            };
            (async () => {
                const data = await axios.get("https://api.airtable.com/v0/app5rf2XrERFzGafL/tblDDsknM81XswIL3",config);
                console.log(data?.data?.records)
                setRecords(() => data?.data?.records)
            })()
    }, [records]);

    const onSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        const CollegeLevel = data.get('BS')?.toUpperCase() ? 'BS': 'MS';

        const payload = {
            records : [
                {
                    fields : {
                        Name: data.get('name').toUpperCase(),
                        Email: (data.get('email').toUpperCase()),
                        "College Level": CollegeLevel,
                        "Class Taken": (data.get('classTaken').toUpperCase()),
                        Expectation: (data.get('expectation').toUpperCase())
                    }
                }
            ]

        }

        const config = {
            headers: { Authorization: `Bearer patJp50nHhQ9KwHSg.4983b995ffe07d98ded7e41d06e92d9535f34eef22ee4e75de8cd415e500b79d` }
        };
        await axios.post("https://api.airtable.com/v0/app5rf2XrERFzGafL/tblDDsknM81XswIL3", payload, config)
    }
  return (
      <>
          <form onSubmit={onSubmit}>
              <section style={{display: "flex", flexDirection: "column", gap: "8px", width: "400px"}}>
                  <input name="name" placeholder="name"/>
                  <input name="email" placeholder="email"/>
                  <section>
                      <div>College Level</div>
                      <section style={{display: "flex", alignItems: "center", justifyContent: "start", gap: "8px"}}>
                          <label htmlFor="BS" style={{width: "50px"}}>BS</label>
                          <input type="radio" name="BS" value="BS"/>
                      </section>
                      <section style={{display: "flex", alignItems: "center", justifyContent: "start", gap: "8px"}}>
                          <label htmlFor="MS" name="MS" style={{width: "50px"}}>MS</label>
                          <input name="MS" type="radio" value="MS"/>
                      </section>
                  </section>
                  <input name="classTaken" placeholder="class taken"/>
                  <textarea name="expectation" placeholder="what is your class expectation"></textarea>
                  <input type="submit"/>
              </section>
          </form>
          <section style={{margin: "8px 0"}}>
              { records?.map((fields) => {
                  console.log(fields)
                  return <div style={{display: "flex", gap: "8px"}} key={fields.id}>
                      <div>{fields?.fields?.Name}</div>
                      <div>{fields?.fields?.Email}</div>
                      <div>{fields?.fields?.["College Level"]}</div>
                      <div>{fields?.fields?.["Class Taken"]}</div>
                      <div>{fields?.fields?.["Expectation"]}</div>
                  </ div>
              })}
          </section>
      </>

  )
}

export default App
