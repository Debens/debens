import { Task } from 'redux-saga';
import { fork, ForkEffect, join, spawn } from 'redux-saga/effects';

type AnyEffect = (...args: any[]) => ForkEffect;
export const supervise = <Fn extends AnyEffect>(effect: Fn): Fn =>
    /* unknown casting as we cannot infer the parameters of overloaded functions */
    ((...args: Parameters<Fn>) => fork(supervise._watch, effect, args)) as unknown as Fn;

supervise._watch = function* <Fn extends AnyEffect>(effect: Fn, args: Parameters<Fn>) {
    while (true) {
        try {
            /* all supervised effects need to run on the root so when cancelled do no cancel the supervisor */
            const task: Task = yield spawn(supervise._run, effect, args);

            // yield put(spy, task)

            yield join(task);
        } catch (error) {
            // noop
        }
    }
};

supervise._run = function* <Fn extends AnyEffect>(effect: Fn, args: Parameters<Fn>) {
    yield effect(...args);
};
