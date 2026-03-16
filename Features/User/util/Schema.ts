import { object, string } from "yup";



export const SelectSchema = object({
    selectedItem : string().required("you must select an item") 
})


