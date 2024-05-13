const Search = () => {
  return ( 
    <div className="
      min-w-96 flex px-3 py-1 rounded-xl bg-white
      border border-px border-slate-400 focus-within:border-slate-700"
    >
      <input
        type="text"
        placeholder="Search for a hero name"
        className="focus:outline-none w-full text-slate-700"  
      />
    </div>
  );
}
 
export default Search;