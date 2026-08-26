import { Text, Divider, Title } from "@mantine/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { ISpace } from "@/features/space/types/space.types.ts";
import SpacePublicSharingToggle from "@/ee/security/components/space-public-sharing-toggle.tsx";
import SpaceViewerCommentsToggle from "@/ee/security/components/space-viewer-comments-toggle.tsx";
import { useHasFeature } from "@/ee/hooks/use-feature";
import { Feature } from "@/ee/features";

type SpaceSecuritySettingsProps = {
  space: ISpace;
  readOnly?: boolean;
};

export default function SpaceSecuritySettings({
  space,
  readOnly,
}: SpaceSecuritySettingsProps) {
  const { t } = useTranslation();
  const hasSharingControls = useHasFeature(Feature.SHARING_CONTROLS);
  const hasViewerComments = useHasFeature(Feature.VIEWER_COMMENTS);

  if (readOnly) return null;
  if (!hasSharingControls && !hasViewerComments) return null;

  return (
    <div>
      <Title order={3} my="md" size="h6" fw={600}>
        {t("Security")}
      </Title>

      {hasSharingControls && <SpacePublicSharingToggle space={space} />}

      {hasSharingControls && hasViewerComments && <Divider my="lg" />}

      {hasViewerComments && <SpaceViewerCommentsToggle space={space} />}
    </div>
  );
}
