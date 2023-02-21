import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import { Ghost, Grid, GridProps, Loader } from '@debens/mobile-atoms';

export interface PanelListProps<T> extends GridProps {
    data: T[];
    loading?: boolean;
    renderItem: ListRenderItem<T> | null | undefined;
}

const PanelList = <T,>(props: PanelListProps<T>) => {
    const { renderItem, data, loading, children, ...grid } = props;
    return (
        <Grid backgroundColor="$layer-01" borderRadius="medium" p="medium" {...grid}>
            <Grid flexDirection="row" alignItems="center" marginBottom="small">
                {children}
            </Grid>
            <Loader loading={loading} marginY="small" data={data}>
                <Loader.Loading>
                    <Ghost.Text typeset="$body" chars={24} />
                </Loader.Loading>
                {({ data }) => <FlatList data={data} renderItem={renderItem} />}
            </Loader>
        </Grid>
    );
};

export default PanelList;
