interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Renders a JSON-LD <script> block for structured data.
 * Rendered server-side — no client JS needed.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 0) }}
    />
  );
}
