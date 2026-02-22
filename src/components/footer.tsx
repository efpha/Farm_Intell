import React from "react";

const Footer: React.FC = () => {
    return(
        <footer className="flex flex-col gap-2 sm:flex-row py-1 w-full border-t px-4 md:px-6 text-gray-500 text-xs">
            <p>© 2026 FarmIntell</p>
            <div className="sm:ml-auto flex gap-4 sm:gap-6">
                <span className="hover:underline underline-offset-4">Contributors</span>

                <span className="text-blue-600 hover:text-blue-800 hover:underline underline-offset-4">
                    <a href="https://github.com/efpha" target="_blank" rel="noopener noreferrer">Keffa Muthuri</a>
                </span>

                <span className="text-emerald-600 hover:text-emerald-800 hover:underline underline-offset-4">
                {/* TODO */}    <a href="https://github.com/renm226" target="_blank" rel="noopener noreferrer">Samson Odwori</a>
                </span>
            </div>
      </footer>
    )
}
export default Footer;