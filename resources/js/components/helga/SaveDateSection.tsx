export default function SaveDateSection() {
    return (
        <section className="save-date-wrap">
            <div className="save-date" data-aos="zoom-out" data-aos-duration="1200">
                <div className="pict-head" data-aos="zoom-in-up" data-aos-duration="1200" data-aos-delay="500">
                    <div className="pict-frame">
                        <div className="preview-container cover-show" id="savedate-main"></div>
                    </div>
                </div>

                <div className="save-date-head">
                    <p className="save-date-title" data-aos="zoom-in" data-aos-duration="1000">
                        Save The Date
                    </p>
                    <p className="save-date-event" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                        January 28<sup>th</sup>, 2024
                    </p>
                </div>

                <div className="save-date-body">
                    <div className="countdown">
                        <div className="count-item" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
                            <h2 className="count-num count-day">12</h2>
                            <small className="count-text">Days</small>
                        </div>
                        <div className="count-item" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="300">
                            <h2 className="count-num count-hour">7</h2>
                            <small className="count-text">Hours</small>
                        </div>
                        <div className="count-item" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="500">
                            <h2 className="count-num count-minute">3</h2>
                            <small className="count-text">Minutes</small>
                        </div>
                        <div className="count-item" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="700">
                            <h2 className="count-num count-second">42</h2>
                            <small className="count-text">Seconds</small>
                        </div>
                    </div>
                </div>

                <div className="add-to-calendar-wrap" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1100">
                    <a
                        className="add-to-calendar"
                        href="https://www.google.com/calendar/render?action=TEMPLATE&text=Marcell+%26+Lisa+Wedding&dates=20240128T110000/20240128T170000&location=Four+Points+by+Sheraton+Bali%2C+Kuta&details=Wedding+ceremony"
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        id="addToCalendar"
                    >
                        Add to Calendar
                    </a>
                </div>
            </div>
        </section>
    );
}
