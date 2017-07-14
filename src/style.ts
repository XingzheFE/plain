export default `
.popup-box[data-plain-style] {
    z-index: 9;
    padding: 0 0 14px 0;
    cursor: arrow;
    transform: translate3d(-50%, -100%, 0);
    translate: transform ease 0;
    animation: fade-in-data-plain-style linear 0.12s;
}
.popup-box[data-plain-style] .popup-content {
    padding: 0.5rem 1rem;
    min-height: 2rem;
    min-width: 4rem;
    color: #222;
    box-shadow: 0 3px 12px rgba(0,0,0,0.38);
    background: #fff;
    border-radius: 4px;
}
.popup-box[data-plain-style] .popup-arrow{
    position: absolute;
    left: 50%;
    bottom: 0;
    height: 14px;
    width: 28px;
    overflow: hidden;
    transform: translate3d(-50%, 0, 0);
}
.popup-box[data-plain-style] .popup-close {
    position: absolute;
    display: block;
    right: 0;
    top: 0;
    height: 14px;
    width: 14px;
    border: none;
    color: #666;
    font-size: 14px;
    line-height: 14px;
    cursor: pointer;
    background: transparent;
    outline: none;
}
.popup-box[data-plain-style] .popup-arrow::after {
    display: block;
    content: '';
    position: absolute;
    top: -12px;
    left: 3px;
    background: #fff;
    height: 20px;
    width: 20px;
    border-radius: 2px;
    transform: rotate3d(0, 0, 1, 45deg);
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.34);
}
@keyframes fade-in-data-plain-style {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;        
    }
}
`