type Props = {
    src: string
    alt: string
    className?: string
}

const Image = (props: Props) => {
    return (
        <img {...props} />
    )
}

export default Image