import { useState } from "react";
import { Button, Card, Dialog, Flex, Stack, Text, TextInput } from "@sanity/ui";

export const urlAssetSource = {
  name: "external-url",
  title: "Image URL",

  component: UrlAssetSource,
};

function UrlAssetSource({ onSelect, onClose }) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  function handleImport() {
    const value = url.trim();

    if (!value) {
      setError("Enter an image URL.");
      return;
    }

    try {
      new URL(value);
    } catch {
      setError("Enter a valid URL.");
      return;
    }

    onSelect([
      {
        kind: "url",
        value,
        assetDocumentProps: {
          source: {
            name: "external-url",
            id: value,
            url: value,
          },
        },
      },
    ]);
  }

  return (
    <Dialog
      id="external-image-url"
      header="Import image from URL"
      onClose={onClose}
      width={2}
      open
    >
      <Card padding={4}>
        <Stack space={4}>
          <Stack space={3}>
            <Text size={1} weight="semibold">
              Image URL
            </Text>

            <TextInput
              value={url}
              onChange={(event) => {
                setUrl(event.currentTarget.value);
                setError("");
              }}
              placeholder="https://example.com/image.jpg"
            />

            {error && (
              <Text size={1} muted>
                {error}
              </Text>
            )}
          </Stack>

          <Flex gap={2} justify="flex-end">
            <Button text="Cancel" mode="ghost" onClick={onClose} />

            <Button text="Import image" tone="primary" onClick={handleImport} />
          </Flex>
        </Stack>
      </Card>
    </Dialog>
  );
}
