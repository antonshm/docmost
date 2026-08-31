import { useAtomValue } from "jotai";
import { treeDataAtom } from "@/features/page/tree/atoms/tree-data-atom.ts";
import React, { useCallback, useEffect, useState } from "react";
import { findBreadcrumbPath } from "@/features/page/tree/utils";
import {
  Button,
  Anchor,
  Popover,
  Breadcrumbs,
  ActionIcon,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconCornerDownRightDouble, IconDots } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import classes from "./breadcrumb.module.css";
import { SpaceTreeNode } from "@/features/page/tree/types.ts";
import { buildPageUrl, getPageTitle } from "@/features/page/page.utils.ts";
import type { TFunction } from "i18next";
import { usePageQuery } from "@/features/page/queries/page-query.ts";
import { extractPageSlugId } from "@/lib";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslation } from "react-i18next";

function getTitle(node: SpaceTreeNode, t: TFunction) {
  const name = getPageTitle(node.name, node.isBase, t);
  if (node.icon) {
    return `${node.icon} ${name}`;
  }
  return name;
}

export default function Breadcrumb() {
  const { t } = useTranslation();
  const treeData = useAtomValue(treeDataAtom);
  const [breadcrumbNodes, setBreadcrumbNodes] = useState<
    SpaceTreeNode[] | null
  >(null);
  const { pageSlug, spaceSlug } = useParams();
  const { data: currentPage } = usePageQuery({
    pageId: extractPageSlugId(pageSlug),
  });
  const isMobile = useMediaQuery("(max-width: 48em)");

  useEffect(() => {
    if (treeData?.length > 0 && currentPage) {
      const breadcrumb = findBreadcrumbPath(treeData, currentPage.id);
      setBreadcrumbNodes(breadcrumb || null);
    }
  }, [currentPage?.id, treeData]);

  // Show up to this many real page crumbs before collapsing the middle
  // ones behind the "..." popover. First page + last (MAX_VISIBLE_CRUMBS - 1)
  // pages stay visible, matching the slice used below in getBreadcrumbItems.
  const MAX_VISIBLE_CRUMBS = 5;

  const getHiddenNodes = () => {
    if (!breadcrumbNodes || breadcrumbNodes.length <= MAX_VISIBLE_CRUMBS) {
      return [];
    }
    const tailCount = MAX_VISIBLE_CRUMBS - 1;
    return breadcrumbNodes.slice(1, breadcrumbNodes.length - tailCount);
  };

  const HiddenNodesTooltipContent = () =>
    getHiddenNodes().map((node) => (
      <Button.Group orientation="vertical" key={node.id}>
        <Button
          justify="start"
          component={Link}
          to={buildPageUrl(spaceSlug, node.slugId, node.name)}
          variant="default"
          style={{ border: "none" }}
        >
          <Text fz={"sm"} className={classes.truncatedText}>
            {getTitle(node, t)}
          </Text>
        </Button>
      </Button.Group>
    ));

  const MobileHiddenNodesTooltipContent = () =>
    breadcrumbNodes?.map((node) => (
      <Button.Group orientation="vertical" key={node.id}>
        <Button
          justify="start"
          component={Link}
          to={buildPageUrl(spaceSlug, node.slugId, node.name)}
          variant="default"
          style={{ border: "none" }}
        >
          <Text fz={"sm"} className={classes.truncatedText}>
            {getTitle(node, t)}
          </Text>
        </Button>
      </Button.Group>
    ));

  const renderAnchor = useCallback(
    (node: SpaceTreeNode, isCurrent = false) => (
      <Tooltip label={getPageTitle(node.name, node.isBase, t)} key={node.id}>
        <Anchor
          component={Link}
          to={buildPageUrl(spaceSlug, node.slugId, node.name)}
          underline="never"
          fz="sm"
          key={node.id}
          className={classes.truncatedText}
          aria-current={isCurrent ? "page" : undefined}
        >
          {getTitle(node, t)}
        </Anchor>
      </Tooltip>
    ),
    [spaceSlug, t],
  );

  const getBreadcrumbItems = () => {
    if (!breadcrumbNodes) return [];

    if (breadcrumbNodes.length > MAX_VISIBLE_CRUMBS) {
      const firstNode = breadcrumbNodes[0];
      const tailNodes = breadcrumbNodes.slice(-(MAX_VISIBLE_CRUMBS - 1));

      return [
        renderAnchor(firstNode),
        <Popover
          width={250}
          position="bottom"
          withArrow
          shadow="xl"
          key="hidden-nodes"
        >
          <Popover.Target>
            <ActionIcon
              color="gray"
              variant="transparent"
              aria-label={t("Show hidden breadcrumbs")}
            >
              <IconDots size={20} stroke={2} />
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            <HiddenNodesTooltipContent />
          </Popover.Dropdown>
        </Popover>,
        ...tailNodes
          .slice(0, -1)
          .map((node) => renderAnchor(node)),
        renderAnchor(tailNodes[tailNodes.length - 1], true),
      ];
    }

    return breadcrumbNodes.map((node, i) =>
      renderAnchor(node, i === breadcrumbNodes.length - 1),
    );
  };

  const getMobileBreadcrumbItems = () => {
    if (!breadcrumbNodes) return [];

    if (breadcrumbNodes.length > 0) {
      return [
        <Popover
          width={250}
          position="bottom"
          withArrow
          shadow="xl"
          key="mobile-hidden-nodes"
        >
          <Popover.Target>
            <Tooltip label={t("Breadcrumbs")}>
              <ActionIcon
                color="gray"
                variant="transparent"
                aria-label={t("Breadcrumbs")}
              >
                <IconCornerDownRightDouble size={20} stroke={2} />
              </ActionIcon>
            </Tooltip>
          </Popover.Target>
          <Popover.Dropdown>
            <MobileHiddenNodesTooltipContent />
          </Popover.Dropdown>
        </Popover>,
      ];
    }

    return breadcrumbNodes.map((node, i) =>
      renderAnchor(node, i === breadcrumbNodes.length - 1),
    );
  };

  return (
    <nav aria-label={t("Breadcrumb")} className={classes.breadcrumbDiv}>
      {breadcrumbNodes && (
        <Breadcrumbs className={classes.breadcrumbs}>
          {isMobile ? getMobileBreadcrumbItems() : getBreadcrumbItems()}
        </Breadcrumbs>
      )}
    </nav>
  );
}
