import Detail from "../reusable/detail";


export default function ProfileDetails({dbData, onClick}){
    const detailName = ["Email", "First Name", "Last Name", "Preferred Name", "Bio", "Interest Tags"]
    return (
        <><h1>Details</h1>
        <div>
            {dbData.map((detail, index)=>
                detail ?
                <Detail key={index}
                name={detailName[index]} value={detail} ></Detail>
                :
                <div>
                    <h3>To add your {detailName[index]} go to: 
                    <strong onClick={onClick} > Edit Profile</strong>  
                    </h3>
                    <hr/>
                </div>
                
            )}
        </div>
        </>
    )
}