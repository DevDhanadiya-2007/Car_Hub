import { Hero, CustomFilter, SearchBar } from "@/components";
import Image from "next/image";
import { CarCard } from "@/components";
import { fetchCars } from "@/utils";
import { HomeProps } from "@/types";
import { yearsOfProduction, fuels } from "@/constants";
import ShowMore from "@/components/ShowMore";

export default async function Home({ searchParams }: HomeProps) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  console.log(allCars);

  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>
        <div className='home__filters' >
          <SearchBar />

          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='year' options={yearsOfProduction} />
          </div>
        </div>
        {!isDataEmpty ? (
          <section>
            <div className='home_cars-wrapper'>
              {allCars?.map(
                (car) => <CarCard car={car} />
              )}
            </div>
            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (<div className='home_error-container'>
          <h2 className=' font-bold text-xl'>Oops, no results found</h2>
          <p>{allCars?.message}</p>
        </div>
        )}
      </div>
    </main >
  );
}
