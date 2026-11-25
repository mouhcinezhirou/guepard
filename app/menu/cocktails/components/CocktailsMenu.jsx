'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  {
    category: "Cocktails Signatures",
    items: [
      { name: "Hugo \"Cholo\" Spritz", price: "160", ingredients: "Liqueur de fleur de sureau, Cordial de huacatay, Prosecco, Parfum de verveine", description: "L'apéritif classique avec un autre accent." },
      { name: "Chilicano Sauvage", price: "160", ingredients: "Pisco, Miel et estragon, Ginger Ale, Citric", description: "Rafraîchissant, à base de plantes, intemporel." },
      { name: "Disco 2000", price: "160", ingredients: "Rhum blanc, Liqueur de marasquin, Cranberry, Cordial acidulé à la pastèque", description: "Pop, chic, avec une touche Cosmopolitan." },
      { name: "Gin Basil Splash", price: "160", ingredients: "Gin, Basilic, Citron, Liqueur de pomme verte, Parfum de thym", description: "Un classique revisité." },
      { name: "El Dorado", price: "160", ingredients: "Pisco, Liqueur de pêche, Jus d’ananas, Sour pistache", description: "Our pisco punch version" },
      { name: "Passion Vodka", price: "300", ingredients: "Vodka, Fruit de la Passion", description: "4 shots", group: "Shots" },
      { name: "Felino", price: "90", ingredients: "Piment rose, Verveine, Ananas", description: "Frais, floral et légèrement épicé.", group: "Mocktails" },
      { name: "Cheetah", price: "90", ingredients: "Fruit de la passion, Hibiscus, Sirop de canne, Eau pétillante", description: "Léger, fruité et pétillant.", group: "Mocktails" },
    ],
  },
  {
    category: "Cocktails",
    items: [
      { name: "Negroni", price: "160" },
      { name: "Espresso Martini", price: "160" },
      { name: "Tequila Sunrise", price: "160" },
      { name: "Gin Fizz", price: "160" },
      { name: "Margarita", price: "160" },
      { name: "Whisky Sour", price: "160" },
      { name: "St-Germain Spritz", price: "180", ingredients: "Liqueur St-Germain, Prosecco, eau pétillante", description: "Un cocktail léger et floral, équilibré par les bulles du Prosecco et de l'eau pétillante" },
      { name: "Mocktails",        price: "90" },
    ],
  },
  {
    category: "Soft",
    items: [
      { name: "Sidi Ali",         price: "60", ingredients: "Eau minérale naturelle",          description: "Eau minérale naturelle rafraîchissante du Maroc" },
      { name: "Evian",            price: "100", ingredients: "Eau minérale premium",             description: "Eau minérale pure des Alpes françaises" },
      { name: "Evian Pétillante", price: "70", ingredients: "Eau minérale gazeuse naturelle",   description: "Eau minérale naturellement pétillante d'Evian" },
    ],
  },
];

// ─── Item row ─────────────────────────────────────────────────────────────────

function MenuItem({ item, expanded, onToggle, isLast }) {
  const hasDetails = !!item.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`${hasDetails ? 'cursor-pointer group' : ''} ${!isLast ? 'border-b border-[#74031E]/10' : ''}`}
      onClick={hasDetails ? onToggle : undefined}
    >
      <div className="flex items-start justify-between gap-4 py-5">
        <div className="flex-1">
          <p className="text-[16px] tracking-[0.14em] uppercase text-[#74031E] font-light leading-none mb-2">
            {item.name}
          </p>
          {item.ingredients && (
            <p className="text-[12px] tracking-wide text-[#74031E]/60 font-normal leading-relaxed">
              {item.ingredients}
            </p>
          )}
          {hasDetails && (
            <div className="flex items-center gap-1.5 mt-3 text-[10px] tracking-[0.22em] uppercase text-[#74031E]/60 font-medium">
              <span>{expanded ? 'Fermer' : 'Détails'}</span>
              <motion.svg
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                width="9" height="9" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </motion.svg>
            </div>
          )}
        </div>
        <p className="text-[16px] tracking-[0.1em] text-[#74031E] font-light flex-shrink-0 mt-0.5">
          {item.price}
        </p>
      </div>

      <AnimatePresence>
        {expanded && hasDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-[12px] tracking-wide text-[#74031E]/65 font-normal italic leading-relaxed pb-5 pl-4 border-l border-[#74031E]/20">
              {item.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Section block ────────────────────────────────────────────────────────────

function MenuSection({ section }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const toggle = (i) => setExpandedIndex(expandedIndex === i ? null : i);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4 mb-2">
        <span className="text-[11px] tracking-[0.35em] uppercase text-[#74031E] font-medium whitespace-nowrap">
          {section.category}
        </span>
        <span className="flex-1 h-px bg-[#74031E]/20" />
      </div>

      <div>
        {section.items.map((item, i) => {
          const prevGroup = i > 0 ? section.items[i - 1].group : undefined;
          const showGroupLabel = item.group && item.group !== prevGroup;

          return (
            <div key={item.name}>
              {showGroupLabel && (
                <p className={`text-[10px] tracking-[0.25em] uppercase text-[#74031E]/50 font-medium ${i === 0 ? 'mb-2' : 'mt-6 mb-2'}`}>
                  {item.group}
                </p>
              )}
              <MenuItem
                item={item}
                expanded={expandedIndex === i}
                onToggle={() => toggle(i)}
                isLast={i === section.items.length - 1}
              />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CocktailsSoftMenu() {
  return (
    <section className="w-full bg-[#EAD4BA] font-montserrat py-14 px-6 md:px-20 lg:px-40">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-12">

        {sections.map((section) => (
          <MenuSection key={section.category} section={section} />
        ))}

        <div className="flex items-center justify-center gap-2 pt-2">
          <span className="w-10 h-px bg-[#74031E]/25" />
          <span className="w-1.5 h-1.5 border border-[#74031E]/40 rotate-45" />
          <span className="w-10 h-px bg-[#74031E]/25" />
        </div>

      </div>
    </section>
  );
}