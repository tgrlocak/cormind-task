import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { Machine } from "../models/Machine";
import { MachineStats } from "../models/MachineStats";

export const client = new ApolloClient({
  uri: "http://dev.prowmes.com/panel/api/graphql/v2",
  credentials: "include",
  cache: new InMemoryCache(),
});

export class DataService {
  async getMachines() {
    let machines: Machine[] = [];

    try {
      const result = await client.query({
        query: gql`
          query Entities {
            entities(model: Machine)
          }
        `,
      });

      let models = result.data["entities"];

      models.forEach((m: any) => {
          machines.push(new Machine(m.id, m.barcode));
      });
    } catch (error) {
      console.log(error);
    }
    
    return machines;
  }

  async getMachineStats(id: Number): Promise<MachineStats> {
    try {
      const result = await client.query({
        query: gql`
          query MachineStats($id: ID!) {
            machineStats(id: $id) {
              minCycle
              maxCycle
              status
              processStatus
              prodAmount
              defectAmount
              amountChange
              workDuration
              loadAmount
              dropAmount
              expectedProdAmount
              failureDuration
              breakDuration
              availability
              performance
              quality
              oee
            }
          }
        `,
        variables: {
          id: id,
        },
      });

      let stat = result.data["machineStats"];
      return new MachineStats(stat['id'], stat['prodAmount'], stat['oee']);
    } catch (error) {
      console.log(error);
    }

    return null as any;
  }
}
