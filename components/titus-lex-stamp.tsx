"use client";

import type { LexStamp } from "@/data/titus/lex-stamps";

type TitusLexStampProps = {
  stamp: LexStamp;
};

export function TitusLexStamp({ stamp }: TitusLexStampProps) {
  const englishIdentity = stamp.objectIdentityEnglishSecondary
    ? `${stamp.objectIdentityEnglishPrimary} / ${stamp.objectIdentityEnglishSecondary}`
    : stamp.objectIdentityEnglishPrimary;

  const anchorRef = `${stamp.anchor.book} ${stamp.anchor.chapter}:${stamp.anchor.verse}`;

  return (
    <article className="titus-lex-stamp" aria-label={`${stamp.strongId} Lex Stamp`}>
      <div className="titus-lex-stamp__pair-row">
        <button className="titus-lex-stamp__pair-cell" type="button">
          <span className="titus-lex-stamp__idline">
            <strong>{stamp.currentObject.strongId}</strong>
            <span>·</span>
            <em>({stamp.currentObject.transliteration})</em>
          </span>
          <span className="titus-lex-stamp__gloss">{englishIdentity}</span>
        </button>

        <button
          className={
            stamp.lxxMoment.resolved
              ? "titus-lex-stamp__pair-cell"
              : "titus-lex-stamp__pair-cell is-empty"
          }
          type="button"
        >
          {stamp.lxxMoment.resolved ? (
            <>
              <span className="titus-lex-stamp__idline">
                <strong>{stamp.lxxMoment.greekStrongId}</strong>
                <span>·</span>
                <em>({stamp.lxxMoment.transliteration})</em>
              </span>
              <span className="titus-lex-stamp__gloss">
                {stamp.lxxMoment.english}
              </span>
            </>
          ) : (
            <span className="titus-lex-stamp__dash">—</span>
          )}
        </button>
      </div>

      <div className="titus-lex-stamp__witness-row">
        <div className="titus-lex-stamp__kjv">
          {stamp.inheritedKjvLexical}
        </div>
        <button className="titus-lex-stamp__anchor" type="button">
          {anchorRef}
        </button>
      </div>

      <div className="titus-lex-stamp__lineage-row">
        <span className="titus-lex-stamp__arrow">←</span>
        <div className="titus-lex-stamp__lineage">
          {stamp.lineage.length > 0 ? (
            stamp.lineage.slice(0, 3).map((item, index) => (
              <span key={item.strongId}>
                <button type="button">({item.transliteration})</button>
                {index < stamp.lineage.slice(0, 3).length - 1 ? (
                  <span className="titus-lex-stamp__sep"> / </span>
                ) : null}
              </span>
            ))
          ) : (
            <span className="titus-lex-stamp__dash">—</span>
          )}
        </div>
        <span className="titus-lex-stamp__arrow">→</span>
      </div>
    </article>
  );
}
