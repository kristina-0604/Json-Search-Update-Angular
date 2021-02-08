export interface Blog{
    id:number;
    category_id:number;
    title:string;
    text:string;
    img_url: string;
    is_active:boolean;
}

export interface BlogDisplayType{
    id:number;
    category_name:string;
    title:string;
    text:string;
    img_url: string;
    is_active:boolean;
}

