export default function TickSVG({ color, onClick }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill={color} onClick={onClick} width="20" height="20" viewBox="0 0 24 24">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 17l-5-5.299 1.399-1.43 3.574 3.736 6.572-7.007 1.455 1.403-8 8.597z" />
        </svg>
    )
}
