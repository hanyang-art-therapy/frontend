import '@/tw-styles.css';
import { Contact } from 'lucide-react';

export default function QuickLinksSection() {
    return (
        <section>
            <ul>
                <li>
                    <a href="#">
                    <Contact className="w-[24px] h-[24px] text-[#333]"/>
                    <h3></h3>
                    <span></span>
                    </a>
                </li>
            </ul>
        </section>
    );
}