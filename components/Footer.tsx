import { Megaphone } from "lucide-react";
const Footer: React.FC = () => {
    return (
      <footer className="bg-[#161822] text-cyan-300 font-light p-9 pt-20">
        <div className="container mx-auto">
        <div className=" mx-auto flex place-content-center pb-4 "><Megaphone size={30} className="mr-2" /> <p>Streamable does not host any files, it merely links to 3rd party services.</p> </div>

          <p className="text-center">
            &copy; {new Date().getFullYear()} Streamable.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  