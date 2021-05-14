import React from 'react';
import {
  CustomBlockRenderer,
  RenderHTMLProps,
  TChildrenRenderer
} from 'react-native-render-html';
import { View, Text } from 'react-native';
import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

function AdComponent() {
  return (
    <View
      style={{ backgroundColor: '#B695C0', padding: 10, alignSelf: 'stretch' }}>
      <Text style={{ color: 'white' }}>😈🤑😈🤑😈🤑</Text>
    </View>
  );
}

const adComponentSrc = `function AdComponent() {
  return (
    <View
      style={{ backgroundColor: 'purple', padding: 10, alignSelf: 'stretch' }}>
      <Text style={{ color: 'white' }}>😈🤑😈🤑😈🤑</Text>
    </View>
  );
}`;

const ArticleWithAds: CustomBlockRenderer = function ArticleWithAds({
  TDefaultRenderer,
  tnode,
  ...defaultRendererProps
}) {
  const firstChildrenChunk = tnode.children.slice(0, 2);
  const secondChildrenChunk = tnode.children.slice(2, 4);
  const thirdChildrenChunk = tnode.children.slice(4);
  return (
    <TDefaultRenderer tnode={tnode} {...defaultRendererProps}>
      <TChildrenRenderer tchildren={firstChildrenChunk} />
      {firstChildrenChunk.length === 2 ? <AdComponent /> : null}
      <TChildrenRenderer tchildren={secondChildrenChunk} />
      {secondChildrenChunk.length === 2 ? <AdComponent /> : null}
      <TChildrenRenderer tchildren={thirdChildrenChunk} />
    </TDefaultRenderer>
  );
};

const articleWithAdsSource = `function ArticleWithAds({
  TDefaultRenderer,
  tnode,
  ...defaultRendererProps
}) {
  const firstChildrenChunk = tnode.children.slice(0, 2);
  const secondChildrenChunk = tnode.children.slice(2, 4);
  const thirdChildrenChunk = tnode.children.slice(4);
  return (
    <TDefaultRenderer tnode={tnode} {...defaultRendererProps}>
      <TChildrenRenderer tchildren={firstChildrenChunk} />
      {firstChildrenChunk.length === 2 ? <AdComponent /> : null}
      <TChildrenRenderer tchildren={secondChildrenChunk} />
      {secondChildrenChunk.length === 2 ? <AdComponent /> : null}
      <TChildrenRenderer tchildren={thirdChildrenChunk} />
    </TDefaultRenderer>
  );
}`;

const props: RenderHTMLProps = {
  source: {
    html: `<article>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
    <p>Paragraph 3</p>
    <p>Paragraph 4</p>
    <p>Paragraph 5</p>
  </article>`
  },
  tagsStyles: {
    article: {
      marginHorizontal: 10
    }
  },
  renderers: {
    article: ArticleWithAds
  }
};

const adsRenderersConfig: UIRenderHtmlCardProps = {
  title: 'A Children Tampering example',
  props,
  fnSrcMap: {
    AdComponent: adComponentSrc,
    ArticleWithAds: articleWithAdsSource
  }
};

export default adsRenderersConfig;
