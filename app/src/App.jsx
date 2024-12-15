import SearchResult from "./components/SearchResult/SearchResult";
import { useEffect, useState } from "react";
// import bgn from "../public/bg.png";
import styled from "styled-components"
export const BASE_URL = "http://localhost:9000";
const App = () => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [filter, setFilter] = useState(null);
  const [selectedbtn, setSelectedbtn] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        console.log(json)
        setData(json);
        setFilter(json);

      }
      catch (error) {
        setError("unable to fetch data");

      }
    }
    fetchData();
  }, [])
  // console.log(data);


  const searchFood = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);

    if (searchValue == "") {
      setFilter(null);
    }

    const filter = data?.filter((food) => food.name.toLowerCase().includes(searchValue.toLowerCase()));
    setFilter(filter);

  }

  const filterfood = (type)=>{
    if(type=="all")
      {
        setFilter(data);
        setSelectedbtn("all");
        return;
      }
      const filter = data?.filter((food)=> food.type.toLowerCase().includes(type.toLowerCase()));
      setFilter(filter);
      selectedbtn(type);
  }

  if (error) return <div>{error}</div>
  if (loading) return <div>loading...</div>


  return (

    <Container >
      <TopContainer >
        <div className="logo">
          <img src="/logo.svg" alt="" />
        </div>
        <div className="search">
          <input onChange={searchFood} placeholder="search Food" />
        </div>
      </TopContainer>

      <FilterContainer>
        <Button  onClick={()=>filterfood("all")}>All</Button>
        <Button onClick={()=>filterfood("Breakfast")}>Breakfast</Button>
        <Button onClick={()=>filterfood("Lunch")}>Lunch</Button>
        <Button onClick={()=>filterfood("Dinner")}>Dinner</Button>
      </FilterContainer>

      <SearchResult data={filter} />


    </Container>
  );
};

export default App;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const TopContainer = styled.div`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search{
    input{
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 15px;
      padding: 0 10px;
      
    }
  } 
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`

export const Button = styled.div`
  background: #ff4343;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover{
    background-color: #f22f2f;
  }
`


