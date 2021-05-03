import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import EditorialModules from '~/components/modules/EditorialModules/EditorialModules';
import { styles } from '~/components/modules/EditorialModules/EditorialModules.styles';
import { SiteModuleMultiColumn } from '~/data/models/SiteModules';

function ModuleMultiColumn(props: SiteModuleMultiColumn) {
  return (
    <div data-component="module-multi-column">
      <Grid>
        <GridItem
          gridColumn={'2/6'}
          gridColumnM={'2/8'}
          gridColumnL={'2/14'}
          gridColumnXL={'4/12'}
        >
          <div
            css={[
              styles.multiColumnContainer,
              styles['multiColumn' + props.columns],
            ]}
          >
            <div>
              {props.column1 &&
                props.column1.length &&
                props.column1.map((module, id) => (
                  <EditorialModules
                    key={`${module.type}_${id}`}
                    moduleData={module}
                    moduleType={module.type}
                    isColumn
                  />
                ))}
            </div>
            <div>
              {props.column2 &&
                props.column2.length &&
                props.column2.map((module, id) => (
                  <EditorialModules
                    key={`${module.type}_${id}`}
                    moduleData={module}
                    moduleType={module.type}
                    isColumn
                  />
                ))}
            </div>
            {props.columns > 2 && (
              <div>
                {props.column3 &&
                  props.column3.length &&
                  props.column3.map((module, id) => (
                    <EditorialModules
                      key={`${module.type}_${id}`}
                      moduleData={module}
                      moduleType={module.type}
                      isColumn
                    />
                  ))}
              </div>
            )}
            {props.columns > 3 && (
              <div>
                {props.column4 &&
                  props.column4.length &&
                  props.column4.map((module, id) => (
                    <EditorialModules
                      key={`${module.type}_${id}`}
                      moduleData={module}
                      moduleType={module.type}
                      isColumn
                    />
                  ))}
              </div>
            )}
          </div>
        </GridItem>
      </Grid>
    </div>
  );
}

export default ModuleMultiColumn;
