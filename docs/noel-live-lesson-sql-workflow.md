# Noel Live Lesson SQL Workflow

This workflow governs live Titus course-word lessons that read from Noel through `public.titus_course_word_lesson_live_v1`.

## 1. Start from the edit board

Use this view before editing a live lesson:

```sql
select *
from public.titus_live_lesson_edit_board_v1
where lesson_slug = 'h8451';
```

This shows the current drawer, passage, relationship, and pattern-link counts for the lesson.

## 2. Edit the lesson headline/function fields

Use `titus.lesson_packets` for the durable public headline, confidence, function reading, summary, and known limits.

```sql
update titus.lesson_packets
set
  confidence = 'high',
  function_reading = '...',
  public_summary = '...',
  known_limits = array['...'],
  updated_at = now()
where lesson_slug = 'h8451';
```

## 3. Edit drawer prose

Use `titus.lesson_drawers.body` for public lesson modules. The body is JSONB shaped like this:

```json
{
  "summary": "Short module summary.",
  "statements": [
    {
      "label": "Function statement",
      "title": "The measured claim",
      "references": "Optional references",
      "lines": ["Line one.", "Line two."]
    }
  ]
}
```

Edit one drawer at a time:

```sql
update titus.lesson_drawers
set body = '{"summary":"...","statements":[]}'::jsonb
where lesson_slug = 'h8451'
  and drawer_code = 'function_reading';
```

## 4. Edit canon passages

Use `titus.lesson_canon_passages` for lesson-specific passages. Verse text is hydrated by the public live view from `public.titus_public_verse_text_v1`.

```sql
insert into titus.lesson_canon_passages (
  lesson_canon_passage_id,
  lesson_slug,
  ref,
  book,
  chapter,
  start_verse,
  end_verse,
  passage_role,
  notice,
  sort_order
) values (
  gen_random_uuid(),
  'h8451',
  'Proverbs 1:8',
  'Pro',
  1,
  8,
  8,
  'first_anchor',
  'Mother Torah enters household formation.',
  20
)
on conflict (lesson_slug, ref) do update
set notice = excluded.notice,
    passage_role = excluded.passage_role,
    sort_order = excluded.sort_order;
```

## 5. Edit lesson-specific relationships

Use `titus.lesson_relationships` for links that belong specifically to a lesson.

```sql
insert into titus.lesson_relationships (
  lesson_relationship_id,
  lesson_slug,
  relationship_type,
  target_label,
  target_slug,
  target_strong_id,
  source_table,
  source_ref,
  function_note,
  status,
  sort_order
) values (
  gen_random_uuid(),
  'h8451',
  'travels_with',
  'Hear / Obey',
  'h8085',
  'H8085',
  'titus.course_slots',
  'hearing_response',
  'Law-instruction requires hearing as its first response gate.',
  'published',
  10
);
```

Allowed relationship statuses are `candidate`, `beta`, `published`, `reviewed`, and `retired`.

## 6. Promote reusable discoveries into pattern boards

Use pattern boards when a discovery should move with more than one lesson.

Primary tables:

- `titus.pattern_boards`
- `titus.pattern_board_sections`
- `titus.pattern_board_relationships`
- `titus.pattern_board_passages`
- `titus.lesson_pattern_links`

Pattern-board public view:

```sql
select *
from public.titus_course_word_pattern_boards_v1
where lesson_slug = 'h8085';
```

Link a reusable board to a lesson:

```sql
insert into titus.lesson_pattern_links (
  lesson_slug,
  pattern_key,
  lesson_role,
  status,
  sort_order
) values (
  'h8085',
  'hearing_obedience_gate',
  'primary_pattern',
  'published',
  20
)
on conflict (lesson_slug, pattern_key) do update
set lesson_role = excluded.lesson_role,
    status = excluded.status,
    sort_order = excluded.sort_order;
```

## 7. Verify after every write

Always verify through the public live lesson view:

```sql
select
  lesson_slug,
  primary_strong_id,
  lesson_number,
  jsonb_array_length(drawers) as drawer_count,
  jsonb_array_length(canon_passages) as passage_count,
  jsonb_array_length(relationships) as relationship_count,
  jsonb_array_length(pattern_boards) as pattern_board_count
from public.titus_course_word_lesson_live_v1
where lesson_slug = 'h8451';
```

A live lesson is considered connected when it has a packet row, word row, drawer rows, passage rows, relationship rows, and at least one linked pattern board.
