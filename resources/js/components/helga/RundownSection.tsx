interface Agenda {
    time: string;
    text: string;
}

interface RundownEvent {
    title: string;
    agendas: Agenda[];
}

interface Props {
    data?: {
        events: RundownEvent[];
    };
}

export default function RundownSection({ data }: Props) {
    const rundownEvents = data?.events || [
        {
            title: 'Resepsi',
            agendas: [
                { time: '11:00 AM', text: 'Grand Entrance' },
                { time: '11:15 AM', text: 'Cut the cake & Speeches' },
                { time: '11:30 AM', text: 'Photo Session' },
                { time: '12:30 PM', text: 'First Dance Bride & Groom' },
                { time: '1:00 PM', text: 'Games' },
                { time: '1:30 PM', text: 'Grand Exit' },
            ],
        },
    ];

    return (
        <section className="rundown-container">
            <div className="rundown-inner">
                <h3 className="rundown-title">Rundown</h3>
                <div className="rundown-event-list">
                    {rundownEvents.map((event, eventIndex) => (
                        <div key={eventIndex} className="rundown-event">
                            <h5 className="rundown-event-title">{event.title}</h5>
                            <div className="rundown-agenda-list">
                                {event.agendas.map((agenda, agendaIndex) => (
                                    <div key={agendaIndex} className="rundown-agenda">
                                        <p className="rundown-agenda-time">{agenda.time}</p>
                                        <div className="rundown-divider">
                                            <div className="rundown-line"></div>
                                            <div className="rundown-circle"></div>
                                        </div>
                                        <div className="rundown-agenda-content">
                                            <p className="rundown-agenda-text">{agenda.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
