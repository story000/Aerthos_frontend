import React from "react"

const Footer: React.FC = () => {
    return (
        
        <footer className="sticky bottom-0 flex gap-4 w-full text-[6px] justify-center items-center bg-white">
            <div className="flex items-center">
                Copyright ©Aerthos {new Date().getFullYear()}. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
