function FilterButton({selectedBase, onChange} : FilterButtonProps){
    return (
        <div className="mb-12 flex gap-4">
            <label className="text-2xl" htmlFor="categorySelect">Selectionnez une base: </label>
            <select className="bg-black" id="categorySelect" onChange={onChange} value={selectedBase}>
                <option value="All">Toutes</option>
                <option value="Tomate">Tomate</option>
                <option value="Crème fraiche">Crème Fraiche</option>
            </select>
        </div>
    )
}

type FilterButtonProps = {
    selectedBase : string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;

}

export default FilterButton;