import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import Boom from "boom";

const app = new Koa();
const router = new Router({
   prefix: "/api"
});

router.get("/:id", async (ctx, next) => {
   ctx.body = { msg: `Hello World ${ctx.params.id}` };

   await next();
});

router.get("/test", async (ctx, next) => {
   let testValue = ctx.request.query;

   ctx.body = { msg: `Hello World ${testValue["test"]}` };

   await next();
});

router.post("/test", bodyParser(), async (ctx, next) => {
   let body = ctx.request.body;

   if (body["Test"] === "One") {
      console.log("it's one");
   }

   await next();
});

app.use(router.routes());
app.use(router.allowedMethods({
   throw: true,
   notImplemented: () => Boom.notImplemented(),
   methodNotAllowed: () => Boom.methodNotAllowed()
}));

app.listen(3000, () => {
   console.log("Started");
});
