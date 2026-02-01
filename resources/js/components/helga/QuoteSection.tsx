interface Props {
    data?: {
        text: string;
        reference: string;
    };
}

export default function QuoteSection({ data }: Props) {
    const quote =
        data?.text ||
        'And among His Signs is this, that He created for you mates from among yourselves, that ye may dwell in tranquility with them, and He has put love and mercy between your hearts. Verily in that are Signs for those who reflect.';
    const reference = data?.reference || 'QS. Ar-Rum : 21';

    return (
        <div className="quote-wrap">
            <p className="quote-caption" data-aos="fade-up" data-aos-duration="1200">
                "{quote}"
                <br />
                <br />({reference})
            </p>
        </div>
    );
}
