import { useMemo } from 'react';

interface Activity {
    icon_type: number;
    title: string;
    time: string;
    venue?: {
        name: string;
        address: string;
        city: string;
        google_maps_url: string;
    };
}

interface DressCode {
    gender: 'men' | 'women';
    type: 'ethnic' | 'formal' | 'casual';
    colors: string[];
}

interface AgendaData {
    title?: string;
    activities: Activity[];
    dress_codes?: DressCode[];
}

interface Props {
    data?: AgendaData;
    invitation?: any;
}

const ActivityIcon1 = () => (
    <svg className="activity-icon 1" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M322.656 180C318.656 180 314.736 180.24 310.896 180.48C316.684 187.936 321.848 195.856 326.336 204.16C359.969 205.08 391.885 219.212 415.174 243.494C438.464 267.776 451.251 300.254 450.767 333.896C450.283 367.538 436.567 399.635 412.589 423.238C388.611 446.84 356.301 460.047 322.656 460C288.719 459.964 256.183 446.467 232.186 422.47C208.189 398.473 194.692 365.937 194.656 332C194.763 307.79 201.686 284.099 214.632 263.641C227.578 243.182 246.023 226.783 267.856 216.32C262.787 209.693 256.99 203.655 250.576 198.32C215.726 217.068 189.57 248.678 177.676 286.421C165.783 324.164 169.09 365.059 186.896 400.4C199.641 425.478 219.059 446.552 243.013 461.302C266.966 476.052 294.525 483.907 322.656 484C362.969 484 401.63 467.986 430.136 439.48C458.642 410.975 474.656 372.313 474.656 332C474.656 291.687 458.642 253.025 430.136 224.52C401.63 196.014 362.969 180 322.656 180Z"
            fill="black"
        />
        <path
            d="M326.336 204.16C321.848 195.856 316.684 187.936 310.896 180.48C301.929 180.427 277.311 183.92 250.576 198.32C256.99 203.655 262.787 209.693 267.856 216.32C291.656 204.914 295.656 204.16 326.336 204.16Z"
            fill="black"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M88.1948 193.539C64.1998 217.534 50.6999 250.066 50.6554 284C50.7034 317.286 63.7079 349.246 86.9137 373.108C110.12 396.971 141.704 410.863 174.975 411.84C179.463 420.144 190.415 435.52 190.415 435.52C190.415 435.52 182.655 436 178.655 436C139.887 435.912 102.618 421.014 74.4718 394.354C46.3258 367.693 29.4305 331.286 27.2425 292.579C25.0544 253.873 37.739 215.793 62.7011 186.13C87.6632 156.468 123.016 137.465 161.527 133.008C168.656 132.183 188.156 132.141 195.791 133C231.547 137.024 264.698 153.659 289.295 179.92C299.376 190.515 307.84 202.537 314.415 215.6C332.221 250.941 335.529 291.836 323.635 329.579C311.741 367.322 285.585 398.932 250.735 417.68C244.321 412.345 238.525 406.307 233.455 399.68C255.288 389.217 273.734 372.818 286.679 352.359C299.625 331.901 306.548 308.21 306.655 284C306.619 250.063 293.122 217.527 269.125 193.53C245.128 169.533 212.592 156.036 178.655 156C144.721 156.044 112.19 169.544 88.1948 193.539Z"
            fill="black"
        />
        <path
            d="M250.735 417.68C244.321 412.345 238.525 406.307 233.455 399.68C224.735 404.513 200.831 413.712 174.975 411.84C179.463 420.144 190.415 435.52 190.415 435.52C223.656 432.5 228.156 429.827 250.735 417.68Z"
            fill="black"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M333.641 182.592L352.093 184.446L368.016 189.279L368.501 147.421L393.841 155.379L370.306 189.998L386.134 195.137L402.333 204.165L456.302 172.229C457.596 171.479 458.653 170.379 459.35 169.056C460.048 167.732 460.358 166.239 460.245 164.747L456.965 121.791C456.846 120.193 456.249 118.668 455.253 117.413C454.257 116.158 452.906 115.231 451.377 114.753L344.523 81.1935C342.995 80.7119 341.358 80.7003 339.823 81.1602C338.288 81.62 336.927 82.5301 335.915 83.7726L308.665 117.141C307.719 118.3 307.119 119.702 306.935 121.187C306.75 122.672 306.989 124.178 307.622 125.534L333.641 182.592ZM386.134 195.137L409.716 160.365L432.766 167.605L386.134 195.137ZM352.093 184.446L329.576 135.196L352.625 142.435L352.093 184.446ZM441.393 128.388L436.508 126.854L420.158 146.874L443.361 154.161L441.393 128.388ZM403.672 141.697L420.022 121.676L366.29 104.8L368.258 130.574L403.672 141.697ZM349.804 99.6225L344.919 98.0884L328.569 118.109L351.772 125.396L349.804 99.6225Z"
            fill="black"
        />
        <path
            d="M418.763 71.8016L424.765 46.9105C426.059 41.5418 422.755 36.1381 417.389 34.8458C412.019 33.5515 406.618 36.8545 405.324 42.2227L399.322 67.1138C398.238 71.6104 400.378 76.1293 404.256 78.2398C405.008 78.649 405.826 78.9683 406.698 79.1785C412.068 80.4728 417.469 77.1711 418.763 71.8016Z"
            fill="black"
        />
        <path
            d="M369.406 67.3112L362.091 39.0568C360.708 33.7114 355.251 30.498 349.905 31.8827C344.559 33.2666 341.347 38.7229 342.731 44.0688L350.046 72.3232C350.769 75.1142 352.601 77.3236 354.949 78.6014C357.097 79.7706 359.678 80.1589 362.233 79.4978C367.578 78.1143 370.789 72.6566 369.406 67.3112Z"
            fill="black"
        />
        <path
            d="M477.463 66.9405C473.293 63.3221 466.976 63.7665 463.357 67.9378L444.67 89.467C441.049 93.6374 441.497 99.9527 445.667 103.573C446.227 104.059 446.824 104.47 447.45 104.81C451.484 107.006 456.639 106.186 459.773 102.576L478.46 81.0463C482.081 76.8759 481.633 70.5602 477.463 66.9405Z"
            fill="black"
        />
    </svg>
);

const ActivityIcon2 = () => (
    <svg className="activity-icon 2" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_3167_46)">
            <path
                d="M291.89 66.15C292.629 66.317 293.367 66.397 294.094 66.397C298.66 66.397 302.782 63.241 303.827 58.592L313.485 15.664C314.697 10.276 311.318 4.92399 305.937 3.70999C300.556 2.49299 295.212 5.87999 293.999 11.268L284.341 54.196C283.13 59.584 286.51 64.936 291.89 66.15Z"
                fill="black"
            />
            <path
                d="M244.82 52.527C246.72 55.538 249.96 57.186 253.272 57.186C255.096 57.186 256.943 56.685 258.598 55.638C263.26 52.687 264.652 46.51 261.705 41.841L238.239 4.65899C235.293 -0.0100131 229.124 -1.40101 224.461 1.54699C219.799 4.49799 218.407 10.675 221.354 15.344L244.82 52.527Z"
                fill="black"
            />
            <path
                d="M334.915 75.605C336.74 75.605 338.586 75.104 340.243 74.056L377.404 50.528C382.066 47.576 383.456 41.399 380.508 36.731C377.561 32.064 371.392 30.671 366.73 33.623L329.569 57.15C324.907 60.102 323.517 66.279 326.465 70.947C328.365 73.957 331.604 75.605 334.915 75.605Z"
                fill="black"
            />
            <path
                d="M458.873 433.94L395.627 406.67L375.351 330.873C401.52 321.084 423.744 300.848 435.942 275.231C447.87 250.18 448.672 222.818 438.271 197.916C438.196 197.732 437.583 196.296 437.345 195.764L393.87 98.387C391.867 93.901 386.905 91.537 382.168 92.809L286.61 118.444L288.076 104.279C288.579 99.418 285.5 94.905 280.795 93.607L249.515 84.975C249.451 84.9575 249.388 84.9406 249.324 84.9244C244.067 83.582 238.681 86.6976 237.234 91.959C235.769 97.284 238.892 102.79 244.209 104.257L267.336 110.639L263.067 151.886C234.703 138.863 197.465 140.254 171.788 156.755C150.985 170.124 117.919 170.342 95.5626 158.187L132.89 74.612L158.106 81.381C158.124 81.386 158.143 81.391 158.162 81.3959C163.469 82.7898 168.915 79.6283 170.338 74.311C171.766 68.976 168.605 63.493 163.278 62.062L129.836 53.084C125.099 51.811 120.136 54.175 118.133 58.66L74.6266 156.069C63.2726 181.526 63.7746 209.736 76.0406 235.503C88.2396 261.129 110.476 281.378 136.65 291.174L116.375 366.97L53.1226 394.216C41.8566 399.082 34.7956 410.324 35.5536 422.191C36.3096 434.042 44.7606 443.7 57.6086 447.394C57.6666 447.411 57.7246 447.427 57.7826 447.442L146.202 471.144C146.254 471.158 146.307 471.172 146.36 471.185C149.299 471.922 152.194 472.281 154.992 472.281C164.558 472.281 172.985 468.085 178.074 460.439C184.661 450.543 184.161 437.274 176.827 427.416L135.67 372.15L155.944 296.358C161.798 297.341 167.732 297.831 173.674 297.831C195.711 297.83 217.838 291.161 236.234 278.49C237.849 277.378 239.417 276.224 240.946 275.038C248.337 293.661 261.721 309.558 279.739 320.794C297.299 331.745 318.045 337.48 338.547 337.48C344.431 337.48 350.294 337.003 356.056 336.046L376.332 411.845L335.174 467.114C327.836 476.969 327.325 490.239 333.903 500.135C338.995 507.796 347.43 512 357.008 512C359.794 512 362.679 511.644 365.604 510.914C365.661 510.9 365.717 510.885 365.774 510.87L454.193 487.14C454.249 487.125 454.305 487.109 454.36 487.094C467.233 483.398 475.695 473.731 476.445 461.867C477.195 450.004 470.129 438.78 458.873 433.94ZM284.406 139.742L379.111 114.336L416.419 197.9C394.072 210.057 361.008 209.833 340.189 196.454C323.826 185.928 301.644 181.293 279.882 183.444L284.406 139.742ZM161.455 449.348C158.993 453.048 154.056 452.486 151.281 451.802L63.0446 428.15C60.3076 427.351 55.7716 425.36 55.4876 420.919C55.3096 418.136 56.9696 414.341 61.0256 412.588L121.476 386.549L160.812 439.371C163.454 442.92 162.997 447.031 161.455 449.348ZM224.916 262.011C203.851 276.52 175.667 281.466 151.343 274.916L151.341 274.915C151.341 274.915 151.339 274.915 151.337 274.914L151.334 274.913C127.016 268.407 105.074 250.009 94.0716 226.897C86.3976 210.776 84.5466 193.494 88.5086 177.071C101.839 183.799 117.367 187.214 132.846 187.213C150.652 187.212 168.384 182.709 182.577 173.588C204.023 159.804 238.499 159.988 260.853 173.289L257.225 208.343C254.974 230.152 243.5 249.211 224.916 262.011ZM290.299 303.816C273.397 293.276 261.669 277.672 256.853 259.528C268.189 245.571 275.197 228.766 277.093 210.402L277.771 203.851C296.429 201.048 315.693 204.467 329.398 213.284C343.608 222.416 361.346 226.923 379.161 226.923C394.633 226.923 410.153 223.509 423.474 216.785C427.439 233.215 425.59 250.5 417.913 266.622C406.913 289.725 384.986 308.109 360.664 314.61H360.662L360.659 314.611C360.656 314.612 360.653 314.613 360.65 314.614C337.463 320.864 311.163 316.828 290.299 303.816ZM448.929 467.845L360.697 491.525C357.923 492.205 352.992 492.758 350.531 489.054C348.991 486.737 348.54 482.625 351.187 479.07L390.524 426.247L450.981 452.315C455.03 454.056 456.685 457.832 456.51 460.604C456.231 465.051 451.676 467.044 448.929 467.845Z"
                fill="black"
            />
            <path
                d="M237.234 91.959C238.681 86.6976 244.067 83.582 249.324 84.9244L163.278 62.062C168.605 63.493 171.766 68.976 170.338 74.311C168.915 79.6283 163.469 82.7898 158.162 81.3959L244.209 104.257C238.892 102.79 235.769 97.284 237.234 91.959Z"
                fill="black"
            />
        </g>
        <defs>
            <clipPath id="clip0_3167_46">
                <rect width="512" height="512" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

export default function AgendaSection({ data, invitation }: Props) {
    const title = data?.title || "It's The Day";

    // Format date from invitation
    const weddingDate = useMemo(() => {
        if (!invitation?.wedding_date) return null;
        const date = new Date(invitation.wedding_date);
        return date;
    }, [invitation?.wedding_date]);

    const getOrdinalSuffix = (day: number) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    };

    const formattedDate = useMemo(() => {
        if (!weddingDate) return null;
        const dayName = weddingDate.toLocaleDateString('en-US', { weekday: 'long' });
        const month = weddingDate.toLocaleDateString('en-US', { month: 'long' });
        const day = weddingDate.getDate();
        const year = weddingDate.getFullYear();

        return {
            dayName,
            dateStr: (
                <>
                    {month} {day}
                    <sup>{getOrdinalSuffix(day)}</sup>, {year}
                </>
            ),
        };
    }, [weddingDate]);

    // Return null if no activities data
    if (!data?.activities || data.activities.length === 0) {
        return null;
    }

    return (
        <section className="agenda-wrap">
            <div className="agenda-inner">
                <div className="agenda-head">
                    <h1 className="agenda-title" data-aos="zoom-in" data-aos-duration="1500">
                        {title}
                    </h1>
                </div>

                <div className="agenda-body">
                    <div className="event-item" data-aos="fade-up" data-aos-duration="1200">
                        {formattedDate && (
                            <div className="event-head">
                                <h1 className="event-day" data-aos="fade-up" data-aos-duration="1000">
                                    {formattedDate.dayName},
                                </h1>
                                <p className="event-date" data-aos="fade-up" data-aos-duration="1000">
                                    {formattedDate.dateStr}
                                </p>
                            </div>
                        )}

                        <div className="event-content">
                            <div className="activity-wrap">
                                {data.activities.map((activity, index) => (
                                    <div key={index} className="activity-item">
                                        <div className="activity-head">
                                            {activity.icon_type === 1 ? <ActivityIcon1 /> : <ActivityIcon2 />}
                                            <h1 className="activity-title" data-aos="fade-up" data-aos-duration="1000">
                                                {activity.title}
                                            </h1>
                                            <p className="activity-time" data-aos="fade-up" data-aos-duration="1000">
                                                {activity.time}
                                            </p>
                                        </div>
                                        {activity.venue && (
                                            <div className="activity-details">
                                                <p className="activity-hall" data-aos="fade-up" data-aos-duration="1000">
                                                    {activity.venue.name}
                                                </p>
                                                <p className="activity-address" data-aos="fade-up" data-aos-duration="1000">
                                                    {activity.venue.address}
                                                </p>
                                                <p className="activity-city" data-aos="fade-up" data-aos-duration="1000">
                                                    {activity.venue.city}
                                                </p>
                                                <div className="activity-link-wrap" data-aos="fade-up" data-aos-duration="1000">
                                                    <a
                                                        href={activity.venue.google_maps_url}
                                                        className="activity-link"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        View Maps
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Dress Code Section */}
                            {data?.dress_codes && data.dress_codes.length > 0 && (
                                <div className="dress-wrapper">
                                    <div className="dress-inner">
                                        <div className="dress-header" data-aos="fade-up" data-aos-duration="1000">
                                            <h2 className="dress-title">Dresscode</h2>
                                        </div>
                                        <div className="dress-body">
                                            <div className="dress-list" data-aos="fade-up" data-aos-duration="1000">
                                                {data.dress_codes.map((dress, index) => (
                                                    <div key={index} className="dress-item">
                                                        <p className="dress-item-title">{dress.gender === 'men' ? 'Men' : 'Women'}</p>
                                                        <div className={`dress-preview ${dress.gender === 'men' ? 'man-preview' : 'woman-preview'}`}>
                                                            <div className="dress-icon">
                                                                <img
                                                                    className="dress-icon-img"
                                                                    src={`/media/icons/ic-dress-${dress.gender === 'men' ? 'man' : 'woman'}-${dress.type}.png`}
                                                                    alt={`Dress ${dress.gender} ${dress.type}`}
                                                                    width="36"
                                                                    height="36"
                                                                />
                                                                <p className="dress-icon-label">
                                                                    {dress.type.charAt(0).toUpperCase() + dress.type.slice(1)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="dress-color-list">
                                                            {dress.colors.map((color, colorIndex) => (
                                                                <div
                                                                    key={colorIndex}
                                                                    className="dress-color-item"
                                                                    style={{ '--bg-color': color } as React.CSSProperties}
                                                                    title={color}
                                                                ></div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Ornaments */}
                            <div className="ornaments-wrapper">
                                <div className="orn-event-2">
                                    <div
                                        className="image-wrap"
                                        data-aos="fade-down"
                                        data-aos-duration="1000"
                                        data-aos-delay="850"
                                        data-anchor-id="bottom-0"
                                    >
                                        <img src="https://katsudoto.id/media/template/exclusive/helga/original/orn-ranting.png" alt="Orn Event 2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
