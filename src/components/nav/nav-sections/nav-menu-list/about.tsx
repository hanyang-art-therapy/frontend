import '@/tw-styles.css';

export default function About () {
    return(
        <ul className=" mt-4 bg-white shadow-md p-[20px] hidden absolute top-full left-[-10px] group-hover:block z-50">
            <li><a href="#">미래상</a></li>
            <li><a href="#">교수진</a></li>
            <li><a href="#">교육 과정</a></li>
            <li><a href="#">자격증</a></li>
            <li><a href="#">졸업 후 전망</a></li>
            <li><a href="#">MOU기관</a></li>
            <li><a href="#">오시는 길</a></li>
        </ul>
    );
}