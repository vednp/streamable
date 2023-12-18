const Footer: React.FC = () => {
    return (
      <footer className="bg-[#161822] text-white p-9 pt-20">
        <div className="container mx-auto">
          <p className="text-center">
            &copy; {new Date().getFullYear()} Streamable. All Rights Reserved.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  