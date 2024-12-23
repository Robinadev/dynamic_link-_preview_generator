import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Loader } from "./components/shared/loader";
import { Preview } from "./components/shared/preview";

import { Button } from "./components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";

export type DataType = {
  title: string;
  description: string;
  image: string;
};

const schema = z.object({
  url: z.string().url(),
});

function App() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<DataType | null>(null);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setLoading(true);
      setData(null);

      const { data } = await axios.post("http://localhost:5005/preview", values);
      setData(data);
      form.setValue("url", "");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center w-full lg:w-1/2 mx-auto p-10">
      <h1 className="my-10 text-3xl font-bold">Generate Preview for Link</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full gap-2 items-center mb-10"
        >
          <FormField
            name="url"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Enter Url" />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit">Generate</Button>
        </form>
      </Form>

      {isLoading && <Loader />}

      {data && !isLoading && (
        <Preview
          title={data.title}
          description={data.description}
          image={data.image}
        />
      )}
    </div>
  );
}

export default App;