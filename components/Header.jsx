import Navbar from './Navbar';
import NavMenu from './NavMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  return (
    <header className="flex flex-col w-full border-b-2 min-h-fit bg-slate-100 dark:bg-neutral-800 text-stone-900 dark:text-stone-50 border-slate-300 dark:border-neutral-300">
      <section className="flex flex-row content-center justify-between h-16 my-auto">
        <div className="w-1/12 my-auto">
          <p className="text-center">LOGO</p>
        </div>
        <form className="flex flex-row w-6/12">
          <input
            className="w-full h-10 py-2 pl-4 my-auto border-gray-300 dark:placeholder:text-stone-50 dark:border-gray-100 bg-neutral-200 dark:bg-neutral-500 rounded-bl-3xl rounded-tl-3xl focus:outline-0"
            type="text"
            placeholder="Encuentra productos, marcas..."
          />
          <button
            className="w-10 h-10 m-auto border-gray-300 dark:border-gray-100 text-stone-900 dark:text-stone-50 bg-neutral-300 dark:bg-neutral-600 rounded-br-3xl rounded-tr-3xl"
            type="submit"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
        <Navbar />
      </section>
      <NavMenu />
    </header>
  );
}
