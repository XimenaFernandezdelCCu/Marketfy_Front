// export default function ContentWrap(){
//     return (
//         <>
//         </>
//     )
// }

import { Outlet } from "react-router-dom";
//Components
import Header from "./header";
import Footer from "./footer";
import Contact from "./contact";

export default function ContentWrap() {

    return (
      <>
        <Header></Header>
        <div className="content" >
          <Outlet/>  
        </div>
        <Contact></Contact>
        <Footer></Footer>
      </>
    );
  }