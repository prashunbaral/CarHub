"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import SearchManufacturer from "./SearchManufacturer";

const SearchButton = ({otherClasses}:{otherClasses:string}) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src="/magnifying-glass.svg"
      alt="magnifying glass"
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
)

const SearchBar = () => {
    const [manufacturer, setManufacturer] = useState('')
    const [model, setModel] = useState('')
    const router = useRouter()
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if(manufacturer === '' && model===''){
        alert('Please fill in the search bar')
      }
      updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase())
    }

const updateSearchParams = (model:string, manufacturer:string) => {
  const SearchParams = new URLSearchParams(window.location.search)

  if(model){
    SearchParams.set('model', model)
  } else {
    SearchParams.delete('model')
  }

  if(manufacturer){
    SearchParams.set('manufacturer', manufacturer)
  } else {
    SearchParams.delete('manufacturer')
  }

  const newPathname = `${window.location.pathname}?${SearchParams.toString()}`

  router.push(newPathname)

}
  return (
    <form className='searchbar' onSubmit={handleSearch}>
        <div className="searchbar__item">
            <SearchManufacturer 
                manufacturer={manufacturer}
                setManuFacturer={setManufacturer}
            />
            <SearchButton otherClasses="sm:hidden"/>
        </div>
        <div className="searchbar__item">
          <Image
            src="/model-icon.png"
            width={25}
            height={25}
            className="absolute w-[20px] h-[20px] ml-4"
            alt="car model icon"
          />
          <input
            type="text"
            name="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Tiguan"
            className="searchbar__input"
          />
          <SearchButton otherClasses="sm:hidden" />
        </div>
        <SearchButton otherClasses="max-sm:hidden" />
    </form>
  )
}

export default SearchBar