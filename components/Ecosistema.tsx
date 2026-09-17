import { Package, Bot, FileText, Users, MessageCircle, Gift } from 'lucide-react';

export default function Ecosistema() {
  const features = [
    {
      icon: <Package className="w-6 h-6 text-viola" />,
      label: "Fornitori privati testati",
      desc: "Contatti verificati, non liste generiche",
    },
    {
      icon: <Bot className="w-6 h-6 text-viola" />,
      label: "Bot Resellife",
      desc: "Segnala occasioni sul mercato 24 ore su 24",
    },
    {
      icon: <FileText className="w-6 h-6 text-viola" />,
      label: "Guide pratiche",
      desc: "PDF operativi, non teoria",
    },
    {
      icon: <Users className="w-6 h-6 text-viola" />,
      label: "Community privata",
      desc: "700+ ragazzi che stanno facendo la stessa cosa",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-viola" />,
      label: "Supporto diretto",
      desc: "Rispondiamo noi, non un bot di assistenza",
    },
    {
      icon: <Gift className="w-6 h-6 text-viola" />,
      label: "Bonus di benvenuto",
      desc: "Un modo per rientrare della quota d'iscrizione",
    },
  ];

  return (
    <section
      id="ecosistema"
      aria-labelledby="ecosistema-heading"
      className="py-20 lg:py-28 bg-superficie"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="ecosistema-heading"
          className="font-anton text-[clamp(1.8rem,4vw,3rem)] uppercase text-center text-testo mb-5"
        >
          TUTTO QUELLO CHE TI SERVE,
          <br />
          IN UN POSTO SOLO
        </h2>

        <p className="text-center text-testo/65 max-w-2xl mx-auto mb-14 leading-relaxed">
          Resellife Academy è l&apos;ecosistema che ti dà gli strumenti per
          costruire un extra mensile con il reselling: fornitori testati, il Bot
          Resellife, guide pratiche, una community privata e supporto diretto.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.label}
              className="bg-notte border border-bordo rounded-card p-5 flex items-start gap-4 hover:border-viola/40 transition-colors duration-200"
            >
              <div className="flex-shrink-0 mt-0.5" aria-hidden>
                {f.icon}
              </div>
              <div>
                <p className="font-semibold text-testo text-sm">{f.label}</p>
                <p className="text-testo/50 text-xs mt-0.5 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
