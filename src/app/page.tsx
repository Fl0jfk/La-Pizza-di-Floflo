"use client"

import Image from 'next/image';
import { useState, useEffect } from 'react';
import FilterButton from './components/buttons/FilterButton';

interface Pizza {
  id: number;
  name: string;
  image:string;
  base: string;
  components: Array<{id:number; component:string}>
}

async function fetchDataFromAPI(): Promise<{ data: { pizzas: Pizza[] } }> {
  const response = await fetch('https://la-pizza-di-floflo.vercel.app/api/pizzas'/*https://la-pizza-di-floflo.vercel.app/api/pizzas    http://localhost:3000/api/pizzas  */, {
    method: 'GET',
  });
  return response.json();
}

export default function Home() {
  const [data, setData] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBase, setSelectedBase] = useState("All");
    const filterPizzasByBase = () => {
        if (selectedBase === "All") {
            return data;
        } else {
            return data.filter((pizza) => pizza.base === selectedBase);
        }
    };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchDataFromAPI();
        setData(result.data.pizzas);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedBase]);
  return (
    <main className="flex flex-col items-center p-4 gap-12 w-full">
      <h1 className='text-6xl'>La Pizza di Floflo</h1>
      <FilterButton onChange={(e) => setSelectedBase(e.target.value)} selectedBase={selectedBase}/>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <section className='grid grid-cols-6 w-full max-w-[1200px] lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 xxs:grid-cols-1 gap-y-[120px] place-content-center place-items-center'>
          {data && data.length > 0 ? (
            filterPizzasByBase().map((pizza) => (
              <div 
                key={`${pizza.id}-${pizza.name}`} 
                className={`relative rounded-xl bg-gray-700 p-4 flex flex-col w-[180px] h-[300px] self-center 
                            ${pizza.base === "Tomate" ? "border-2 border-red-500" : ""} 
                            ${pizza.base === "Crème fraiche" ? "border-2 border-white" : ""} 
                            ${pizza.base === "Crème fraiche et curry" ? "border-2 border-y-white border-x-yellow-500" : ""} 
                            ${pizza.base === "Crème fraiche et boursin" ? "border-2 border-y-white border-x-green-500" : ""} 
                            ${pizza.base === "Crème fraiche et sauce BBQ" ? "border-2 border-y-white border-x-red-500" : ""}
                          `}
                >
                <h2 className="text-2xl self-center underline">{pizza.name}</h2>
                <p>{`Base: ${pizza.base}`}</p>
                <ul className='flex w-full flex-col'>
                  {pizza.components.map((component) => (
                    <li key={component.id}>- {component.component}</li>
                  ))}
                </ul>
                <Image src={pizza.image} alt={`Photo de la pizza ${pizza.name}`} width={150} height={150} className="absolute bottom-[-100px]"/>
              </div>
            ))
          ) : (
            <p>No pizzas found.</p>
          )}
        </section>
      )}
    </main>
  );
}




